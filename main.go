package phantomtype

import (
	"fmt"
	"strings"

	"encoding/json"
	"net/http"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
	"google.golang.org/appengine"
	"google.golang.org/appengine/image"
	"google.golang.org/appengine/blobstore"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

func init() {
	http.HandleFunc("/hello", handler)
	http.HandleFunc("/prepare", prepareHandler)
}

type Photos struct {
	Name string `json:"name"`
	Photos []Photo `json:"photos"`
}

type Photo struct {
	Key string  `json:"key"`
	Name string `json:"name"`
	City string `json:"city"`
	Place string `json:"place"`
	Size int64  `json:"size"`
	Url string  `json:"url"`
	Exif Exif `json:exif`
}

func prepareHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	const bucketName = "phantomtype-180814.appspot.com"

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Errorf(ctx, "Failed to create client: %V", err)
	}


	bucket := client.Bucket(bucketName)
	city := r.FormValue("c")
	place := r.FormValue("p")

	objects := bucket.Objects(ctx, &storage.Query{Delimiter: "", Prefix: "photos/" + city + "/" + place})
	photos := []Photo{}
	for {
		o, err := objects.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return
		}
		if strings.HasSuffix(o.Name, ".jpg") {
			blob_key, _ := blobstore.BlobKeyForFile(ctx, "/gs/" + bucketName + "/" + o.Name)
			url, _ := image.ServingURL(ctx, blob_key, nil)

			reader, _ := bucket.Object(o.Name).NewReader(ctx)
			exif := ExtractExif(reader)
			defer reader.Close()

			var ps []Photo
			q := datastore.NewQuery("Photo").Filter("Name =", o.Name)
			keys, _ := q.GetAll(ctx, &ps)

			var key *datastore.Key
			if len(ps) > 0 {
				key = keys[0]
			} else {
				key = datastore.NewIncompleteKey(ctx, "Photo", nil)
			}
			photo := Photo{ key.String(),o.Name, city, place, o.Size, url.String(), exif}
			log.Debugf(ctx, "%+v", photo)

			_, err := datastore.Put(ctx, key, &photo)
			if err != nil {
				log.Errorf(ctx, "Failed to put datastore: %V", err)
				break
			}

			photos = append(photos, photo)
		}
	}

	result := Photos{Name:"prepare", Photos:photos}
	j, err := json.Marshal(result)
	fmt.Fprint(w, string(j))
}


func handler(w http.ResponseWriter, r *http.Request)  {
	ctx := appengine.NewContext(r)
	city := r.FormValue("c")
	place := r.FormValue("p")

	photos := []Photo{}
	q := datastore.NewQuery("Photo").Filter("City =", city).Filter("Place =", place)
	q.GetAll(ctx, &photos)

	result := Photos{Name:"hoge", Photos:photos}
	j, _ := json.Marshal(result)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, string(j))
}
