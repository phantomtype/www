package phantomtype

import (
	"fmt"
	"github.com/dsoprea/go-exif"
	"io"
	"io/ioutil"
	"github.com/dsoprea/go-logging"
    "github.com/mitchellh/mapstructure"
)

type IfdEntry struct {
	IfdPath     string      `json:"ifd_path"`
	FqIfdPath   string      `json:"fq_ifd_path"`
	IfdIndex    int         `json:"ifd_index"`
	TagId       uint16      `json:"tag_id"`
	TagName     string      `json:"tag_name"`
	TagTypeId   uint16      `json:"tag_type_id"`
	TagTypeName string      `json:"tag_type_name"`
	UnitCount   uint32      `json:"unit_count"`
	Value       interface{} `json:"value"`
	ValueString string      `json:"value_string"`
}

// need to be "int" for GAE datastore
type Rational struct {
	Numerator int
	Denominator int
}

// need to be "int" for GAE datastore
type SignedRational struct {
	Numerator int
	Denominator int
}

type Exif struct {
	Make string `json:"Make"`
	Model string `json:"Model"`
	XResolution string `json:"XResolution"`
	YResolution string `json:"YResolution"`
	ResolutionUnit string `json:"ResolutionUnit"`
	Software string `json:"Software""`
	DateTime string `json:"DateTime"`
	ExifTag string `json:"ExifTag"`
	ExposureTime Rational `json:"ExposureTime"`
	FNumber Rational `json:"FNumber"`
	ExposureProgram string `json:"ExposureProgram"`
	ISOSpeedRatings string `json:"ISOSpeedRatings"`
	SensitivityType string `json:"SensitivityType"`
	ExifVersion string `json:"ExifVersion"`
	DateTimeOriginal string `json:"DateTimeOriginal"`
	DateTimeDigitized string `json:"DateTimeDigitized"`
	ShutterSpeedValue SignedRational `json:"ShutterSpeedValue"`
	ApertureValue Rational `json:"ApertureValue"`
	BrightnessValue SignedRational `json:"BrightnessValue"`
	ExposureBiasValue SignedRational `json:"ExposureBiasValue"`
	MaxApertureValue Rational `json:"MaxApertureValue"`
	MeteringMode string `json:"MeteringMode"`
	LightSource string `json:"LightSource"`
	Flash string `json:"Flash"`
	FocalLength Rational `json:"FocalLength"`
	ColorSpace string `json:"ColorSpace"`
	FocalPlaneXResolution Rational `json:"FocalPlaneXResolution"`
	FocalPlaneYResolution Rational `json:"FocalPlaneYResolution"`
	FocalPlaneResolutionUnit string `json:"FocalPlaneResolutionUnit"`
	SensingMethod string `json:"SensingMethod"`
	FileSource string `json:"FileSource"`
	SceneType string `json:"SceneType"`
	CustomRendered string `json:"CustomRendered"`
	ExposureMode string `json:"ExposureMode"`
	WhiteBalance string `json:"WhiteBalance"`
	FocalLengthIn35mmFilm string `json:"FocalLengthIn35mmFilm"`
	SceneCaptureType string `json:"SceneCaptureType"`
	Sharpness string `json:"Sharpness"`
	SubjectDistanceRange string `json:"SubjectDistanceRange"`
	LensSpecification Rational `json:"LensSpecification"`
	LensMake string `json:"LensMake"`
	LensModel string `json:"LensModel"`
	LensSerialNumber string `json:"LensSerialNumber"`
}

func ExtractExif(reader io.Reader) Exif {
	bs, _ := ioutil.ReadAll(reader)
	rawExif, err := exif.SearchAndExtractExif(bs)
	log.PanicIf(err)

	im := exif.NewIfdMappingWithStandard()
	ti := exif.NewTagIndex()

	im.StripPathPhraseIndices("")
	result := Exif{}
	resultData := make(map[string]interface{})

	visitor := func(fqIfdPath string, ifdIndex int, tagId uint16, tagType exif.TagType, valueContext exif.ValueContext) (err error) {
		defer func() {
			if state := recover(); state != nil {
				err = log.Wrap(state.(error))
				log.PanicIf(err)
			}
		}()

		ifdPath, err := im.StripPathPhraseIndices(fqIfdPath)
		log.PanicIf(err)

		it, err := ti.Get(ifdPath, tagId)
		if err != nil {
			if log.Is(err, exif.ErrTagNotFound) {
				fmt.Printf("Warning: Unknown tag: [%s] (%04x)\n", ifdPath, tagId)
				return nil
			} else {
				log.PanicIf(err)
			}
		}

		valueString := ""
		var value interface{}
		if tagType.Type() == exif.TypeUndefined {
			var err error
			value, err = exif.UndefinedValue(ifdPath, tagId, valueContext, tagType.ByteOrder())
			if log.Is(err, exif.ErrUnhandledUnknownTypedTag) {
				value = nil
			} else if err != nil {
				log.Panic(err)
			} else {
				valueString = fmt.Sprintf("%v", value)
			}
		} else if tagType.Type() == exif.TypeRational {
			valueA, err := tagType.ReadRationalValues(valueContext)
			value = valueA[0]
			log.PanicIf(err)
			valueString = fmt.Sprintf("%v/%v", valueA[0].Numerator, valueA[0].Denominator)
		} else if tagType.Type() == exif.TypeSignedRational {
			valueA, err := tagType.ReadSignedRationalValues(valueContext)
			value = valueA[0]
			log.PanicIf(err)
			valueString = fmt.Sprintf("%v/%v", valueA[0].Numerator, valueA[0].Denominator)
		} else {
			valueString, err = tagType.ResolveAsString(valueContext, true)
			log.PanicIf(err)
			value = valueString
		}

		entry := IfdEntry{
			IfdPath: ifdPath,
			FqIfdPath: fqIfdPath,
			IfdIndex: ifdIndex,
			TagId:tagId,
			TagName: it.Name,
			TagTypeId:tagType.Type(),
			TagTypeName:tagType.Name(),
			UnitCount:valueContext.UnitCount,
			Value:value,
			ValueString:valueString,
		}
		resultData[entry.TagName] = entry.Value
		fmt.Printf("%+v\n", entry)

		return nil
	}

	_, err = exif.Visit(exif.IfdStandard, im, ti, rawExif, visitor)
	log.PanicIf(err)
	mapstructure.Decode(resultData, &result)

	return result
}

