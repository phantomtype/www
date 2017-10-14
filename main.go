package phantomtype

import (
	"encoding/json"
	"log"

	"cloud.google.com/go/storage"
	"net/http"
	"google.golang.org/api/iterator"

	"google.golang.org/appengine"
	"fmt"
	"strings"
)

func init() {
	http.HandleFunc("/hello", handler)
}

type Photos struct {
	Name string `json:"name"`
	Photos []Photo `json:"photos"`
}

type Photo struct {
	key string  `json:"key"`
	Name string `json:"name"`
	Size int64  `json:"size"`
}

func handler(w http.ResponseWriter, r *http.Request)  {
	ctx := appengine.NewContext(r)

	bucketName := "phantomtype-180814.appspot.com"

	client, err := storage.NewClient(ctx)
	if err != nil {
		log.Fatalf("Failed to create client: %V", err)
	}

	bucket := client.Bucket(bucketName)

	objects := bucket.Objects(ctx, nil)
	photos := []Photo{}
	for {
		o, err := objects.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return
		}
		if strings.HasSuffix(o.Name, "_tmb.jpg") {
			photo := Photo{o.CustomerKeySHA256,o.Name, o.Size}
			photos = append(photos, photo)
		}
	}
	result := Photos{Name:"hoge", Photos:photos}
	j, err := json.Marshal(result)
	fmt.Fprint(w, string(j))

}
