package phantomtype

import (
	"encoding/json"
	"log"

	"cloud.google.com/go/storage"
	"net/http"
	"google.golang.org/api/iterator"

	"google.golang.org/appengine"
	"google.golang.org/appengine/image"
	"google.golang.org/appengine/blobstore"
	"google.golang.org/appengine/datastore"
	"fmt"
	"strings"
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
}

func prepareHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	bucketName := "phantomtype-180814.appspot.com"

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %V", err)
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

			var ps []Photo
			q := datastore.NewQuery("Photo").Filter("Name =", o.Name)
			keys, _ := q.GetAll(ctx, &ps)

			log.Print(len(ps))

			var photo Photo
			var key *datastore.Key
			if len(ps) > 0 {
				key = keys[0]
				photo = Photo{ key.String(),o.Name, city, place, o.Size, url.String()}
			} else {
				key = datastore.NewIncompleteKey(ctx, "Photo", nil)
				photo = Photo{ key.String(),o.Name, city, place, o.Size, url.String()}
			}

			_, err := datastore.Put(ctx, key, &photo)
			if err != nil {
				log.Fatalf("Failed to put datastore: %V", err)
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

	bucketName := "phantomtype-180814.appspot.com"

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %V", err)
	}

	bucket := client.Bucket(bucketName)

	prefix := "photos/" + r.FormValue("d")

	objects := bucket.Objects(ctx, &storage.Query{Delimiter: "", Prefix: prefix})
	photos := []Photo{}
	//for i := 0; i < 5; i++ {
	for {
		o, err := objects.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return
		}
		log.Print(o)
		if strings.HasSuffix(o.Name, "_g.jpg") {
			//blob_key, _ := blobstore.BlobKeyForFile(ctx, "/gs/" + bucketName + "/" + o.Name)
			//url, _ := image.ServingURL(ctx, blob_key, nil)
			//photo := Photo{"",o.Name, o.Size, url.String()}
			//photos = append(photos, photo)
		}
	}
	result := Photos{Name:"hoge", Photos:photos}
	j, err := json.Marshal(result)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Fprint(w, string(j))
}
