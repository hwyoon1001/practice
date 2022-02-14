var albumBucketName = 'nmlt201021';
var bucketRegion = 'ap-northeast-2';
var IdentityPoolId = 'ap-northeast-2:367dd400-0773-419e-b5db-8b97004e5c64';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: albumBucketName
  }
});

function listAlbums() {
  s3.listObjects({
    Delimiter: '/'
  }, function (err, data) {
    if (err) {
      return alert('There was an error listing your directory: ' + err.message);
    } else {
      console.log('앨범', data.CommonPrefixes)
      var albums = data.CommonPrefixes.map(function (commonPrefix) {
        var prefix = commonPrefix.Prefix;
        var albumName = decodeURIComponent(prefix.replace('/', ''));
        return getHtml([
          '<li>',
          '<span onclick="deleteCheck(\'' + albumName + '\')">X</span>',
          '<span onclick="viewAlbum(\'' + albumName + '\')">',
          albumName,
          '</span>',
          '</li>'
        ]);
      });
      var message = albums.length ?
        getHtml([
          '<p>Click on directory name to view it.</p>',
          '<p>Click on the X to delete the directory.</p>'
        ]) :
        '<p>You do not have any albums. Please Create Directory.';
      var htmlTemplate = [
        '<h2>Directory</h2>',
        message,
        '<ul>',
        getHtml(albums),
        '</ul>',
        '<button onclick="createAlbum(prompt(\'Enter directory Name:\'))">',
        'Create New Directory',
        '</button>'
      ]
      document.getElementById('app').innerHTML = getHtml(htmlTemplate);
    }
  });
}

 
function add_article_with_photo(albumName) {
    var files = document.getElementById("article_image").files;
    if (!files.length) {
        return alert("Please choose a file to upload first.");
    }
    
     for (var i = 0; i < article_image.files.length; i++) {
        var file = article_image.files[i];
        var fileName = file.name;
        var albumPhotosKey = encodeURIComponent(albumName) + "/";
        var albumPhotosKey = albumName + "/";
     
        var photoKey = albumPhotosKey + fileName;
 
    // Use S3 ManagedUpload class as it supports multipart uploads
    var upload = new AWS.S3.ManagedUpload({
        params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file
        }
    });
 
    var promise = upload.promise();
 
    let img_location;
 
    promise.then(
        function(data) {
        //이미지 파일을 올리고 URL을 받아옴
        img_location = JSON.stringify(data.Location).replaceAll("\"","");
        // console.log(img_location);
        
        upload_to_db(img_location);
 
        return alert("Successfully uploaded photo.");;
        },
        function(err) {
            console.log(err);
        return alert("There was an error uploading your photo: ", err.message);
        }
    );
    }
    }
