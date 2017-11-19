package phantomtype

import (
	"fmt"
	"strings"
	"log"

	"encoding/json"
	"net/http"

	"cloud.google.com/go/storage"
	"google.golang.org/api/iterator"
	"google.golang.org/appengine"
	"google.golang.org/appengine/image"
	"google.golang.org/appengine/blobstore"
	"google.golang.org/appengine/datastore"

	"github.com/xor-gate/goexif2/exif"
	"io"
	"io/ioutil"
	"bytes"
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

type Exif struct {
	Model string `json:"Model"`
	Make string `json:"Make"`
	DateTime string `json:"DateTime"`
	FNumber string `json:"FNumber"`
	ISOSpeedRatings string `json:"ISOSpeedRatings"`
	FocalLength string `json:"FocalLength"`
	FocalLengthIn35mmFilm string `json:"FocalLengthIn35mmFilm"`
	ExposureTime string `json:"ExposureTime"`
}

func prepareHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)

	const bucketName = "phantomtype-180814.appspot.com"

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

			reader, _ := bucket.Object(o.Name).NewReader(ctx)
			exif := extractExif(reader)
			defer reader.Close()

			var ps []Photo
			q := datastore.NewQuery("Photo").Filter("Name =", o.Name)
			keys, _ := q.GetAll(ctx, &ps)

			var photo Photo
			var key *datastore.Key
			if len(ps) > 0 {
				key = keys[0]
				photo = Photo{ key.String(),o.Name, city, place, o.Size, url.String(), exif}
			} else {
				key = datastore.NewIncompleteKey(ctx, "Photo", nil)
				photo = Photo{ key.String(),o.Name, city, place, o.Size, url.String(), exif}
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

func extractExif(reader io.Reader) Exif {
	bs, _ := ioutil.ReadAll(reader)
	r, err := exif.Decode(bytes.NewReader(bs))
	if err != nil {
		log.Fatalf("Failed to decode exif: %v", err)
		return Exif{}
	}

	Model, _ := r.Get(exif.Model)
	Make, _ := r.Get(exif.Make)
	DateTime, _ := r.Get(exif.DateTime)
	FNumber, _ := r.Get(exif.FNumber)
	ISOSpeedRatings, _ := r.Get(exif.ISOSpeedRatings)
	FocalLength, _ := r.Get(exif.FocalLength)
	FocalLengthIn35mmFilm, _ := r.Get(exif.FocalLengthIn35mmFilm)
	ExposureTime, _ := r.Get(exif.ExposureTime)

	model, _ := Model.StringVal()
	make, _ := Make.StringVal()
	datetime, _ := DateTime.StringVal()
	fnumber, _ := FNumber.Rat(0)
	iso, _ := ISOSpeedRatings.Int(0)
	focallength, _ := FocalLength.Rat(0)
	focallength35, _ := FocalLengthIn35mmFilm.Int(0)
	exposuretime, _ := ExposureTime.Rat(0)

	return Exif{
		model,
		make,
		datetime,
		fnumber.FloatString(1),
		fmt.Sprintf("%v", iso),
		fmt.Sprintf("%v", focallength.FloatString(0)),
		fmt.Sprintf("%v", focallength35),
		fmt.Sprintf("%v", exposuretime.RatString()),
	}
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
