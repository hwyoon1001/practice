<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Article_Add</title>
        <style>
        </style>
            <!--켜지면 get() 함수를 실행함.  -->
            <body onLoad="get()">
                <div id="articles">
            
                </div>

 
    </head>
 
    <body>
        <div class="Top">
  
        </div>
        <div style="text-align: center;"><h1>글 등록 페이지</h1></div>
 
        <form name="article_add_form" method="POST">
            <table width="940" style="padding:5px 0 5px 0; ">
               <tr height="2"><td colspan="2"></td></tr>
               <tr>
                  <th>name</th>
                  <td><input type="text" id="name" required></td>
               </tr>
               <tr>
                  <th>Title</th>
                  <td><input type="text" id="title" required></td>
                </tr>
                    <th>사진</th>
                    <td><input type="file" id="article_image" name="filename"></td>
                  </tr>
                    <tr>
                      <td colspan="3" style="text-align: center;">
                        <input type="button" value="등록" onClick="upload_to_db()" />
                        <input type="reset" value="취소">
                     </td>
                    </table>
                   </form>
 
        </div>
         
        <script src="https://sdk.amazonaws.com/js/aws-sdk-2.283.1.min.js"></script>
        <script src="./app.js"></script>
        
        <script>
            /* HTML노드 추가 함수 */
            function createNode(element){
                return document.createElement(element);
            }
            /* HTML노드에 자녀 추가 함수 */
            function append(parent, el){
                return parent.appendChild(el);
            }
            /* CSS 속성 추가 함수 */
            function addStyle(styles) { 
              
              /* Create style element */ 
              var css = document.createElement('style'); 
              css.type = 'text/css'; 
         
              if (css.styleSheet)  
                  css.styleSheet.cssText += styles; 
              else  
                  css.appendChild(document.createTextNode(styles)); 
                
              /* Append style to the head element */ 
              document.getElementsByTagName("head")[0].appendChild(css); 
          }
          var elem = document.getElementById('name');
            /* API 게이트웨이로 매물리스트 정보 가져오는 함수 */ 
            const URL = "https://l9biqyi3wk.execute-api.ap-northeast-2.amazonaws.com/stage/board" ;

            
            
          function get() {
            fetch(URL, {
                headers: {
                  'Accept': 'application/json'
                }
              }).then(res => res.json())
              .then(data => console.log(data))
              .catch(err => console.error(err));
          }
              
        
        var Item = {
              'name': "",
              'title': "",
              'img_source': "",
          }
          
      function upload_to_db(img_location) {
        var name = document.querySelector("#name").value;
        var title = document.querySelector("#title").value;
       Item = {
        'name': name,
        'title': title,
        'img_source': img_location,
   
       }

    post()
    }

      function post() {
      fetch(URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            "TableName": "board-test",
            Item
          })
        }).then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
              
              

            
      function submitToAPI(e){
          e.preventDefault();
          add_article_with_photo('images');
       }

        </script>
 
    </body>
 
    <head>
 
    </head>
 
</html>

 
