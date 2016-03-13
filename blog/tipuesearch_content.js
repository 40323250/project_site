var tipuesearch = {"pages":[{"url":"http://project.mde.tw/blog/pages/about/","text":"機械設計專題網誌 http://project.mde.tw 是台灣國立虎尾科技大學機械設計工程系 (Department of Mechanical Design Engineering, National Formosa University, Taiwan ) KMOL 研究室 (Knowledge Management and Optimal utilization Laboratory) 專題網站, 與課程相關的網誌位於 http://chiamingyen.github.io/kmolab/blog/ . 本網誌的所有資料位於 https://github.com/coursemdetw/project_site , 除了所引用的資料特別聲明各自所宣告的使用授權外, 一律採用 AGPL 授權 https://github.com/coursemdetw/project_site/blob/gh-pages/LICENSE . 歡迎您的蒞臨! 專題成員 https://github.com/coursemdetw/project_site/watchers","title":"About","tags":"misc"},{"url":"http://project.mde.tw/blog/yen-dao-ru-opencv-yu-python3.html","text":"OpenCV (Open Source Computer Vision) 是一套實時影像程式庫, 這裡希望利用 Python3 來進行應用程式開發. 安裝 Windows 可以直接從 https://github.com/chiamingyen/kmol2016 git clone 可攜系統. 測試程式: import numpy as np import cv2 # 建立一個黑色背景 img = np.zeros((512,512,3), np.uint8) # 以寬度 5 px 畫一條藍色的對角線 img = cv2.line(img,(0,0),(511,511),(255,0,0),5) # 呈現此影像 cv2.imshow('image',img) cv2.waitKey(0) cv2.destroyAllWindows() ''' # 載入 jpg 圖檔 image = cv2.imread(\"mario.jpg\", flags=cv2.IMREAD_COLOR) # 然後呈現此影像 cv2.imshow('image',image) cv2.waitKey(0) cv2.destroyAllWindows() ''' 在 Windows 環境執行結果: Ubuntu 14.04 在 Ubuntu 操作系統中 for Python2 與 Python3 的 OpenCV 程式庫編譯流程如下: # apt-get 更新 $ sudo apt-get update # apt-get 升級 $ sudo apt-get upgrade # 安裝所需的開發套件 $ sudo apt-get install build-essential cmake git pkg-config # 安裝編譯過程所需的程式庫 $ sudo apt-get install libjpeg8-dev libtiff4-dev libjasper-dev libpng12-dev # 安裝編譯過程所需的程式庫 $ sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev # 安裝編譯過程所需的程式庫 $ sudo apt-get install libgtk2.0-dev # 安裝編譯過程所需的 fortran 編譯器 $ sudo apt-get install libatlas-base-dev gfortran # 安裝編譯過程所需的原始碼 $ sudo apt-get install python3.4-dev # 本台機器的 python 為 2.7 版, 而 python3 則為 python 3.4, 這裡安裝 numpy 模組 $ pip3 install numpy # 希望在帳號目錄下的 tmp 進行編譯工作 $ cd # 更換目錄到 tmp $ cd tmp # 利用 git clone 取得原始碼 $ git clone https://github.com/Itseez/opencv.git # 準備進入倉儲切換分支 $ cd opencv # 採用 3.1.0 版 $ git checkout 3.1.0 # 回到用戶目錄 $ cd .. # 再利用 git clone 下載原始碼 $ git clone https://github.com/Itseez/opencv_contrib.git # 準備進入倉儲切換分支 $ cd opencv_contrib # 與 opencv 配合, 採用 3.1.0 版 $ git checkout 3.1.0 $ cd .. # 準備開始建立程式庫 $ cd opencv $ mkdir build $ cd build # 這裡會同時建立 Python2 與 Python3 的 OpenCV 程式庫檔案 $ cmake -D CMAKE_BUILD_TYPE=RELEASE \\ -D CMAKE_INSTALL_PREFIX=/usr/local \\ -D INSTALL_C_EXAMPLES=OFF \\ -D INSTALL_PYTHON_EXAMPLES=ON \\ -D PYTHON_EXECUTABLE=$(which python3) \\ -D OPENCV_EXTRA_MODULES_PATH= ./../../opencv_contrib/modules \\ -D BUILD_EXAMPLES=ON .. $ make -j4 $ sudo make install $ sudo ldconfig 完成安裝後, 執行上一個測試程式結果:","title":"yen - 導入 OpenCV 與 Python3","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-pelican-jing-tai-wang-ye-yu-wordpress-de-zheng-he-fang-an.html","text":"利用 Leo Editor 的節點資料程式方法, 可以讓 Pelican 靜態網誌的內容與 Wordpress 動態網誌保持同步. 因為 Pelican 靜態網頁結合 Github Pages 網站, 可以完整保留各版本的所有差異資料 ,而 Wordpress 的動態特性也具有即時更新的優點, 因此本機械設計專題網站, 就利用 Leo Editor 建立了3個按鈕, 可以在靜態與動態網誌之間雙向交換內容. 首先是先編寫 Pelican 網誌的文章, 然後再經由下列 Leo Editor 的按鈕, 以 XML-RPC 協定, 將文章送到對應的 Wordpress 網誌. ＃new-to-wp button #coding: utf-8 import xmlrpc.client import datetime import os def get_cat_tag_content(data): # 請注意, 因為 data 來自 .md 的 body pan 內容, 第1行為 @language python # 用跳行符號分割 data_list = data.split(\"\\n\") #第2行為 title title= data_list[1] #第3行為 category category = data_list[2] #第4行為 tags tags = data_list[3] # 有多項資料的 content 型別為數列 # 再將第7行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[6:]) # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Wordpress 的 content = content.replace(' ', ' ') # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式 content = content.replace('~~~python', '[code lang=\"python\"]') content = content.replace('~~~', '[/code]') return title, category, tags, content os.environ['TZ'] = 'Asia/Taipei' ################################# filepath = \"/your/wordpress/username/and/passwrod.txt\" wordpress = \"your.wordpress.site.domain\" fo = open(filepath, \"r+\") data = [] for line in fo.readlines(): data.append(line) fo.close() # 從網誌節點的 parent().h 取得 wp_url # 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑 wp_url = \"https://\"+wordpress+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# wp_blogid = \"0\" status_draft = 0 status_published = 1 server = xmlrpc.client.ServerProxy(wp_url) # 從目前所在節點的 body pan 中取出類別, tags 以及文章內容 title_str, category_str, tags_str, content = get_cat_tag_content(p.b) # title 是一個單獨的字串 title = title_str.split(\":\")[1] # 指定時間出版 ''' date_created = xmlrpc.client.DateTime(datetime.datetime.strptime(\"2013-01-01 00:00\", \"%Y-%m-%d %H:%M\")) ''' # 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表 date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \\ datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),\"%Y-%m-%d %H:%M\")) categories = [category_str.split(\":\")[1]] # 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料 # 先用 : 斷開標投頭的 Tags:, 然後再透過逗點隔開, 將標註轉為數列資料 tags = tags_str.split(\":\")[1].split(\",\") data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags} post_id = server.metaWeblog.newPost(wp_blogid, wp_username, wp_password, data, status_published) # 利用最後的 child 節點來儲存 post_id to_save_post_id = p.insertAsLastChild() # 改為內文為空的節點, id 直接標在 head 標題 to_save_post_id.b = \"\" to_save_post_id.h = post_id # 因為新增節點, commander 必須 redraw c.redraw() g.es(\"post_id 為\", post_id) g.es(\"已經送出資料!\") 其中 filepath 是存放 Wordpress 網誌管理帳號與密碼的存文字檔案路徑 (例如: \"/home/user/file.txt\"), 而 wordpress 則宣告希望對應連結的網址 (例如: \"www.yoursite.blog\"). 當 Wordpress 的網誌文章新增後, 若 Pelican 端的文章改版, 則可以透過下列 edit-to-wp 按鈕進行更新: # edit-to-wp #coding: utf-8 import xmlrpc.client import datetime import os def get_cat_tag_content(data): # 請注意, 因為 data 來自 .md 的 body pan 內容, 第1行為 @language python # 用跳行符號分割 data_list = data.split(\"\\n\") #第2行為 title title= data_list[1] #第3行為 category category = data_list[2] #第4行為 tags tags = data_list[3] # 有多項資料的 content 型別為數列 # 再將第7行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[6:]) # 先將截斷摘要與內文的 pelican md 檔按符號, 換成 Wordpress 的 content = content.replace(' ', ' ') # 接著若內容有 ~~~python 與 ~~~ 則換成 Wordpress 格式 content = content.replace('~~~python', '[code lang=\"python\"]') content = content.replace('~~~', '[/code]') return title, category, tags, content os.environ['TZ'] = 'Asia/Taipei' ################################# filepath = \"/your/wordpress/username/and/passwrod.txt\" wordpress = \"your.wordpress.site.domain\" fo = open(filepath, \"r+\") data = [] for line in fo.readlines(): data.append(line) fo.close() wp_url = \"https://\"+wordpress+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# wp_blogid = \"0\" status_draft = 0 status_published = 1 server = xmlrpc.client.ServerProxy(wp_url) # 從目前所在節點的 body pan 中取出類別, tags 以及文章內容 title_str, category_str, tags_str, content = get_cat_tag_content(p.b) # title 是一個單獨的字串 title = title_str.split(\":\")[1] # 指定時間出版 ''' date_created = xmlrpc.client.DateTime(datetime.datetime.strptime(\"2013-01-01 00:00\", \"%Y-%m-%d %H:%M\")) ''' # 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表 date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \\ datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),\"%Y-%m-%d %H:%M\")) categories = [category_str.split(\":\")[1]] # 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料 tags = tags_str.split(\":\")[1].split(\",\") data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags} # 設法取得原 post 的 id origin_post = p.getLastChild() # 直接從標題取得 post 的 id 號碼 post_id = origin_post.h status = server.metaWeblog.editPost(post_id, wp_username, wp_password, data, status_published) if status: g.es(\"資料已經更新!\") else: g.es(\"有問題, 資料沒有更新!\") 最後, 假如使用者透過 Wordpress 的瀏覽器介面新增文章, Pelican 端也可以準備一個空白節點, 並將文章的 id 號碼作為該空白節點的子節點, 且將該子節點的 header, 設為文章的 id 數, 接下來再用滑鼠停在父空白節點上, 然後以滑鼠點按下列的 get-from-wp 按鈕, 就可以將 Wordpress 端的文章取回, 且節點標題會被填入該文章的標題, 之後 Pelican 端的使用者再依據規劃, 以 @clean 存檔的標題命名該節點. # get-from-wp #coding: utf-8 import xmlrpc.client # 導入 html 模組, 使用 html.unescape 轉換 html 特殊符號 import html ################################# filepath = \"/your/wordpress/username/and/passwrod.txt\" wordpress = \"your.wordpress.site.domain\" fo = open(filepath, \"r+\") data = [] for line in fo.readlines(): data.append(line) fo.close() # 從網誌節點的 parent().h 取得 wp_url # 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑 wp_url = \"https://\"+wordpress+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# server = xmlrpc.client.ServerProxy(wp_url) # 設法透過上述網誌網址, 帳號與密碼, 以及文章 id, 取回 categories, tags, 文章標題, 文章內容等資 # 從最後的 child 節點來取 post_id origin_post = p.getLastChild() post_id = origin_post.h # 取回與 post_id 對應的網誌文章內容 blog_content = server.metaWeblog.getPost(post_id, wp_username, wp_password) title = blog_content[\"title\"] # 這裡要利用 html.unescape 轉回特殊符號 description = html.unescape(blog_content[\"description\"]) mt_text_more = html.unescape(blog_content[\"mt_text_more\"]) if mt_text_more != \"\": post_content = description + \"\\n \\n\"+mt_text_more else: post_content = description # 所取回的 categories 為 list categories = blog_content[\"categories\"] # 所取回的 tags 為以逗點隔開的字串 mt_keywords = blog_content[\"mt_keywords\"] # 取回文章作者 author = blog_content[\"wp_author_display_name\"] p.h = title categories_str = \"\" for category in categories: # 假如不是最後一個 if category != categories[len(categories)-1]: categories_str += category + \", \" else: # 這是最後一個 categories_str += category line1 = \"@language md\\n\" line2 = \"Title: \" +title + \"\\n\" line3 = \"Category: \" + categories_str + \"\\n\" line4 = \"Tags: \" + mt_keywords + \"\\n\" line5 = \"Author: \" + author + \"\\n@others\\n\" post_content = post_content.replace(' ', '\\n \\n') post_content = post_content.replace('[code lang=\"python\"]', '~~~python') post_content = post_content.replace('[/code]', '~~~') p.b = line1 + line2 + line3 + line4 + line5 + post_content + \"\\n\" # 因為節點資料更新, commander 必須 redraw c.redraw() g.es(\"資料已經取回\")","title":"yen - Pelican 靜態網頁與 Wordpress 的整合方案","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-ru-he-can-yu-projectmdetw-de-xie-tong-bian-ji.html","text":"只要是 KMOL 機械設計專題的成員, 就可以依照特定程序, 管理 project.mde.tw 網站上的資料 首先, 你必須是 https://github.com/coursemdetw/project_site/watchers 名單上的成員, 否則就必須透過 Pull Request 的方式來參與 http://project.mde.tw 網誌內容的協同管理. 接下來, 利用 git clone 的方式, 將 https://github.com/coursemdetw/project_site 的倉儲資料複製到近端, 並且將分支切換到 gh-pages, 就可以利用 Leo Editor 開啟或建立, 位於 users 目錄中的 user_template.leo, 然後轉存為\"學號.leo\" 檔案, 透過這個 Leo Editor 的專案檔, 就可以新增文章, 修改其他人的文章, 甚至修改本網誌系統中的任何設定. 將 user_template.leo 轉存為 \"學號.leo\" 後, 第1件重要的事就是修改 @edit user_20160301.md 中的 user_20160301.md 的存檔檔名, 改為 學號_當天日期.md, 然後修改此一 md 檔案的文章標題: Title: user - 使用者的範例網誌文章標題, 因為這個網誌系統根據 Title: 之後的名稱來轉換 html, 若有兩個 .md 檔案的 Title: 資料完全一樣, Pelican 將無法轉檔, 並且會在轉檔的命令列中出現錯誤訊息. 其他的 .md 檔案中, Category: 為文章的類別, 可以參考現有的\"2016g1, Misc 與 Tutorial\" 等3個類別, 可以是組別或是文章的屬性類別. Tags: 則是文章的內容標籤,可以就文章的內容關鍵字加以界定, 至於 Author: 則是用戶的名稱. 在每一個 .md 檔案中, 出現在 \"PELICAN_END_SUMMARY\" 超文件註解標註之前的內容, Pelican 會視為文章的摘要, 當各文章並列時, 文章只會列出標題與摘要. \"PELICAN_END_SUMMARY\" 超文件註解標註之後的內容就是文章的主要內容. 文章中的程式可以利用: for i in range(5): print(i, \":hello\") 來加以標示. 圖檔則可以利用 img 標註引用: 影片引用則可以直接使用 Vimeo 或 Youtube 的 embedded 語法. 因為本網誌能夠在近端與遠端等兩個不同環境下運作, 而兩端的關鍵字搜尋流程與格式不同, 因此轉檔的按鈕也分為 local-pelican 與 gh-pages-pelican 等兩個, 要在近端測試時, 必須滑鼠停在 local-pelican 轉檔按鈕的對應節點上, 然後按下 local-pelican, 經過瀏覽器檢查近端文章轉檔與內容無誤後, 必須將滑鼠停在 gh-pages-pelican 轉檔按鈕的對應節點上, 然後按下 gh-pages-pelican 按鈕, 之後若無任何問題, 就可以將資料提交推送到遠端倉儲的 gh-pages 分支中, 指令如下: git add -A git commit -m \"提交說明訊息\" git push origin gh-pages 最後, 與 http://project.mde.tw 網站維護有關的訊息溝通或註記, 請透過 倉儲 Wiki 進行.","title":"yen - 如何參與 project.mde.tw 的協同編輯","tags":"Tutorial"},{"url":"http://project.mde.tw/blog/yen-pelican-jing-tai-wang-ye-yu-wordpress-de-zheng-he.html","text":"許多網路上的文章都只說明如何從動態的網誌系統轉到靜態網誌架構, 但當我們認定動靜之間各有優劣時, 能否兩者整合並存? Worpress 是一套全世界最廣為使用的動態網誌系統, 採用 PHP 編寫, 一般使用 MySQL 資料庫存放資料, 由於 Wordpress 的安裝與使用都非常直覺, 從許多角度來看, 是一套接近完美的動態網誌系統. 但是, PHP 加上 MySQL 的架構仍然需要在伺服器中運行全球資訊網加上 PHP 解譯器, 同時還要 MySQL 資料庫的支援才能啟動運作, 假如管理者沒有跟上 Wordpress 程式碼或 plugin 的漏洞更新, 或者 MySQL 資料庫未能正常提供資料, 這個用 Wordpress 架構的網誌就會出現危機或者無法使用. 雖然 Wordpress 網誌中的動態程式與資料庫具有潛在缺點, 但是動態性也同時展現優點, 因為使用者一般可以透過瀏覽器, 隨時更改網誌系統的設定, 可以即時更新所有內容. 至於 Pellican 靜態網誌系統, 則針對 Wordpress 動態的問題, 將網誌的編寫格式定調在資料提供者能夠閱讀的 Markdown 或其他類似格式, 然後在近端用各種編輯器完成初步 Markdown 文章的存檔後, 再執行 Pelican 的轉檔指令, 讓 Python 程式將一堆設定與一堆 Markdown 資料中, 轉換成一整套所有內容之間互相串連的 html 檔案, 之後再將這批純 html 格式的文檔加上一些 css 與 Javascript 檔案, 送到全球資訊網伺服器中運行. Pelican 的網誌內容, 因為不需要動態的程式編譯執行, 而只在全球資訊網伺服器中存有 html 與 Javascript, 因此沒有動態程式碼漏洞更新的問題, 也不會有線上的網誌管理系統被入侵的問題, 唯一會產生問題的只有全球資訊網伺服器, 運作或不運作, Javascript 有沒有正確存取的問題, 相較於 Wordpress 的動態程式與資料庫互動, 性質單純許多. 但是 Pelican 的靜態性也同時存在問題, 因為大多數的用戶通常採用文字編輯器來準備或管理 Markdown 檔案, 而且是採用命令列的方式來執行 Pelican 轉檔指令, 因此對於電腦程式操作較不熟悉的使用者來說, 導入 Pelican 靜態網誌的距離仍然遙遠, 況且靜態網誌也有不夠動態與直覺的問題, 許多在 Wordpress 線上能夠直接預覽的功能, 在 Pellican 就沒有那麼方便, 而且有很多的 html 與 css 的特定格式, Pelican 的 Markdown 語法根本就不支援. 可是 Pelican 純文本的 Markdown 與 html, 還有一個最大的好處, 就是可以透過 Github Pages 的網頁架構系統, 讓每一個版本的靜態網誌都以分散式版本系統管理, 這是 Wordpress 現存的版次管理 Plugin 所無法做到的功能, 因此一份內容, 同時呈現在 Wordpress 與 Pelican 網誌是最理想的情況, 但是該如何完成? 由於要整合 Pelican 靜態網誌與 Wordpress 動態網誌, 需要透過程式方法來進行, 這裡只先提供可行的初步技術, 驗證魚與熊掌可以兼得, 我們所採用的管理系統為 Leo Editor: https://github.com/leo-editor/leo-editor , 所有的資料處理流程都是依靠 Python3 程式完成. 首先, 看看 Leo Editor 如何透過 Python3 的程式方法與 Wordpress 網誌互動, 這裡所使用的是 XMLRPC 協定 https://en.wikipedia.org/wiki/XML-RPC , 基本上, 從 Leo Editor 節點, 將新資料送到 Wordpress 系統的按鈕程式. # new_to_wp 按鍵 #coding: utf-8 import xmlrpc.client import datetime import os def get_cat_tag_content(data): data_list = data.split(\"\\n\") # 只有一項資料的 category 型別為字串 category = data_list[0] # 只有一項資料的 tags 型別為字串 tags = data_list[1] # 有多項資料的 content 型別為數列 # 再將第3行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[2:]) return category, tags, content os.environ['TZ'] = 'Asia/Taipei' ################################# # Open a file, 這裡將存取 Wordpress 網誌的對應帳號與密碼, 存在操作系統中 # 路徑則從資料節點上層根節點的 body 內文取得 fo = open(p.parent().b, \"r+\") data = [] for line in fo.readlines(): data.append(line) #print(line) #print(data[0]) # Close opend file fo.close() # 從網誌節點的 parent().h 取得 wp_url # 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑 wp_url = \"https://\"+p.parent().h+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# wp_blogid = \"0\" status_draft = 0 status_published = 1 server = xmlrpc.client.ServerProxy(wp_url) title = p.h #content = p.b category_str, tags_str, content = get_cat_tag_content(p.b) # 指定時間出版 ''' date_created = xmlrpc.client.DateTime(datetime.datetime.strptime(\"2013-01-01 00:00\", \"%Y-%m-%d %H:%M\")) ''' # 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表 (因為伺服主機與操作端時差而定) date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \\ datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),\"%Y-%m-%d %H:%M\")) #categories = [\"Uncategorized\"] #tags = [\"python\", \"測試\"] categories = [category_str.split(\":\")[1]] # 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料 tags = tags_str.split(\":\")[1].split(\",\") data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags} post_id = server.metaWeblog.newPost(wp_blogid, wp_username, wp_password, data, status_published) # 利用最後的 child 節點來儲存 post_id to_save_post_id = p.insertAsLastChild() to_save_post_id.b = post_id to_save_post_id.h = \"文章 id\" # 因為新增節點, commander 必須 redraw c.redraw() g.es(\"post_id 為\", post_id) g.es(\"已經送出資料!\") ''' 其他 metaWeblog 的用法: metaWeblog.newPost (blogid, username, password, struct, publish) returns string(postid) metaWeblog.editPost (postid, username, password, struct, publish) returns true metaWeblog.getPost (postid, username, password) returns struct(blog content) ''' 至於在 Leo Editor 系統中, 用來編輯既有的 Wordpress 文章的按鈕節點程式碼, 則為: #edit_to_wp #coding: utf-8 import xmlrpc.client import datetime import os def get_cat_tag_content(data): data_list = data.split(\"\\n\") # 只有一項資料的 category 型別為字串 category = data_list[0] # 只有一項資料的 tags 型別為字串 tags = data_list[1] # 有多項資料的 content 型別為數列 # 再將第3行之後的資料數列串回成以跳行隔開的資料 content = \"\\n\".join(data_list[2:]) return category, tags, content os.environ['TZ'] = 'Asia/Taipei' ################################# # Open a file fo = open(p.parent().b, \"r+\") data = [] for line in fo.readlines(): data.append(line) #print(line) #print(data[0]) # Close opend file fo.close() # 從網誌節點的 parent().h 取得 wp_url # 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑 wp_url = \"https://\"+p.parent().h+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# wp_blogid = \"0\" status_draft = 0 status_published = 1 server = xmlrpc.client.ServerProxy(wp_url) title = p.h #content = p.b category_str, tags_str, content = get_cat_tag_content(p.b) # 指定時間出版 ''' date_created = xmlrpc.client.DateTime(datetime.datetime.strptime(\"2013-01-01 00:00\", \"%Y-%m-%d %H:%M\")) ''' # 以現在時間出版, 考慮與 Server 時間差八個小時 (480 分鐘), 因此要在 8 個小時前發表 (因為伺服主機與操作端時差而定) date_created = xmlrpc.client.DateTime(datetime.datetime.strptime((datetime.datetime.now()- \\ datetime.timedelta(minutes=480)).strftime('%Y-%m-%d %H:%M'),\"%Y-%m-%d %H:%M\")) #categories = [\"Uncategorized\"] #tags = [\"python\", \"測試\"] categories = [category_str.split(\":\")[1]] # 請注意, 因為 tags 用逗點隔開, 因此必須透過 split() 再分開成為 list 資料 tags = tags_str.split(\":\")[1].split(\",\") data = {'title': title, 'description': content, 'dateCreated': date_created, 'categories': categories, 'mt_keywords': tags} # 設法取得原 post 的 id origin_post = p.getLastChild() post_id = origin_post.b status = server.metaWeblog.editPost(post_id, wp_username, wp_password, data, status_published) if status: g.es(\"資料已經更新!\") else: g.es(\"有問題, 資料沒有更新!\") ''' 其他 metaWeblog 的用法: metaWeblog.newPost (blogid, username, password, struct, publish) returns string(postid) metaWeblog.editPost (postid, username, password, struct, publish) returns true metaWeblog.getPost (postid, username, password) returns struct(blog content) ''' 最後若要經由 Leo Editor 的節點按鈕, 取回既有的 Wordpress 網誌文章, 則可以使用 get_from_wp 按鈕節點: #get_from_wp #coding: utf-8 import xmlrpc.client # 導入 html 模組, 使用 html.unescape 轉換 html 特殊符號 import html ################################# # Open a file fo = open(p.parent().b, \"r+\") data = [] for line in fo.readlines(): data.append(line) fo.close() # 從網誌節點的 parent().h 取得 wp_url # 從網誌節點的 parent().b 取得帳號與密碼對應的文字檔案路徑 wp_url = \"https://\"+p.parent().h+\"/xmlrpc.php\" wp_username = data[0] wp_password = data[1] ################################# server = xmlrpc.client.ServerProxy(wp_url) # 設法透過上述網誌網址, 帳號與密碼, 以及文章 id, 取回 categories, tags, 文章標題, 文章內容等資 # 從最後的 child 節點來取 post_id origin_post = p.getLastChild() post_id = origin_post.b # 取回與 post_id 對應的網誌文章內容 blog_content = server.metaWeblog.getPost (post_id, wp_username, wp_password) title = blog_content[\"title\"] # 這裡要利用 html.unescape 轉回特殊符號 description = html.unescape(blog_content[\"description\"]) mt_text_more = html.unescape(blog_content[\"mt_text_more\"]) if mt_text_more != \"\": post_content = description + \"\\n \\n\"+mt_text_more else: post_content = description # 所取回的 categories 為 list categories = blog_content[\"categories\"] # 索取回的 tags 為以逗點隔開的字串 mt_keywords = blog_content[\"mt_keywords\"] p.h = title categories_str = \"\" for category in categories: # 假如不是最後一個 if category != categories[len(categories)-1]: categories_str += category + \", \" else: # 這是最後一個 categories_str += category p.b = \"categories:\"+categories_str+\"\\ntags:\"+mt_keywords+\"\\n\"+post_content # 因為節點資料更新, commander 必須 redraw c.redraw() g.es(\"資料已經取回\") 好了, 上面的3個 Leo Editor 的按鈕節點程式, 只是從操作系統的特定路徑取出能夠管理遠端 Wordpress 網誌系統的帳號密碼, 然後再透過 XML-RPC 協定, 進行 Wordpress 網誌文章的新增、編輯與取回, 表示使用者可以在一個 Leo Editor 專案檔中完成這些事, 接下來則需要讓 Pelican 轉出的 html 檔案, 能夠同步送到對應的 Wordpress 動態網誌系統, 並且可以做到即時的內容同步, 既可保有靜態網誌的版次管理與單純伺服架構, 而且又可以將 Wordpress 視為 Pelican 的另外一個出口 (意思就是說, Wordpress 中只有特定的內容由 Pelican 端提供, 其他的使用者則仍然透過瀏覽器的方法對 Wordpress 網誌提供內容), 至於後續的處理與可行性驗證, 將在隨後的文章中進行討論.","title":"yen - Pelican 靜態網頁與 Wordpress 的整合","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-wang-ji-flask-cheng-shi-jia-gou.html","text":"Flask 是一套支援 Python3 的全球資訊網程式框架, 這裡希望用它來開發網際輔助機械設計程式. http://flask.pocoo.org/ 是一套簡潔的 Python3 網際程式框架, 在這一系列的導引資料中, 將利用 https://github.com/2015fallhw/simpleflask 倉儲來存放資料, 並將資料同步推送到 http://simpleflask-2014openshift.rhcloud.com/ 執行. 程式環境 假如在 Windows 環境中, 使用可攜套件: https://github.com/chiamingyen/kmol2016 , 則已經內建 Flask 模組, 假如沒有, 可以利用 pip install Flask 安裝. 假如是在 Ubuntu, 可以要用 pip3 install Flask 安裝, 至於在 OpenShift 的 Python3 應用程式, 則是透過 setup.py 安裝. #setup.py 檔案 from setuptools import setup setup(name='KMOL 2016 project', version='1.0', description='OpenShift App', author='KMOL', author_email='course@mde.tw', url='https://www.python.org/community/sigs/current/distutils-sig', install_requires=['Flask>=0.10.1'], ) 由於這裡所開發的 Flask 程式, 需要在近端與 OpenShift 都能運作, 因此 wsgi.py 的內容設計為: #!/usr/bin/python # 導入 os 模組, 主要用來判斷是否在 OpenShift 上執行 import os # 導入同目錄下的 myflaskapp.py import myflaskapp # 以下開始判斷在 OpenShift 或近端執行 if 'OPENSHIFT_REPO_DIR' in os.environ.keys(): # 表示程式在雲端執行 application = myflaskapp.app else: # 表示在近端執行, 以 python3 wsgi.py 執行, 若採 uwsgi 則與 Openshift 運作模式相同 myflaskapp.app.run(debug=True) 也就是說, wsgi.py 會透過os.environ.keys() 的值來判定執行的環境, 若是在 uwsgi 的環境執行時, 則必須使用與 OpenShift 環境相同的啟動模式. 而 wsgi.py 中所導入的 myflaskapp.py 內容則為: # coding: utf-8 from flask import Flask, send_from_directory, request, redirect, render_template, session, make_response import random app = Flask(__name__) # 使用 session 必須要設定 secret_key # In order to use sessions you have to set a secret key # set the secret key. keep this really secret: app.secret_key = 'A0Zr9@8j/3yX R~XHH!jmN]LWX/,?R@T' @app.route(\"/\") def index(): #這是猜數字遊戲的起始表單, 主要在產生答案, 並且將 count 歸零 # 將標準答案存入 answer session 對應區 theanswer = random.randint(1, 100) thecount = 0 # 將答案與計算次數變數存進 session 對應變數 session['answer'] = theanswer session['count'] = thecount return render_template(\"index.html\", answer=theanswer, count=thecount) @app.route('/user/ ') # 為了避免 syntaxhighlighter 自動加上 , 在這裡先行用註解補上, 之後再找解決方案 def user(name): return render_template(\"user.html\", name=name) @app.route('/red') def red(): # 重新導向 google return redirect(\"http://www.google.com\") @app.route('/guessform') def guessform(): session[\"count\"] += 1 guess = session.get(\"guess\") theanswer = session.get(\"answer\") count = session.get(\"count\") return render_template(\"guessform.html\", guess=guess, answer=theanswer, count=count) @app.route('/docheck', methods=['POST']) def docheck(): # session[] 存資料 # session.get() 取 session 資料 # 利用 request.form[] 取得表單欄位資料, 然後送到 template guess = request.form[\"guess\"] session[\"guess\"] = guess # 假如使用者直接執行 doCheck, 則設法轉回根方法 if guess is None: redirect(\"/\") # 從 session 取出 answer 對應資料, 且處理直接執行 docheck 時無法取 session 值情況 try: theanswer = int(session.get('answer')) except: redirect(\"/\") # 經由表單所取得的 guess 資料型別為 string try: theguess = int(guess) except: return redirect(\"/guessform\") # 每執行 doCheck 一次,次數增量一次 session[\"count\"] += 1 count = session.get(\"count\") # 答案與所猜數字進行比對 if theanswer < theguess: return render_template(\"toobig.html\", guess=guess, answer=theanswer, count=count) elif theanswer > theguess: return render_template(\"toosmall.html\", guess=guess, answer=theanswer, count=count) else: # 已經猜對, 從 session 取出累計猜測次數 thecount = session.get('count') return \"猜了 \"+str(thecount)+\" 次, 終於猜對了, 正確答案為 \"+str(theanswer)+\": 再猜 \" return render_template(\"docheck.html\", guess=guess) @app.route('/option', methods=[\"GET\", \"POST\"]) def option(): option_list1 = [\"1\", \"2\", \"3\", \"4\"] option_list2 = [\"a\", \"b\"] return render_template('option.html', option_list1=option_list1, option_list2=option_list2) @app.route('/optionaction', methods=['POST']) def optionaction(): # 這裡將根據使用者所選擇的選項值, 來進行後續的設計運算 return request.form[\"option1\"] + \":\" + request.form[\"option2\"] # 等運算或資料處理結束後, 再將相關值送到對應的 template 進行資料的展示 #return render_template('optionaction.html', option_list1=option_list1, option_list2=option_list2) if __name__ == \"__main__\": app.run() 此外, 因為 Flask 內定靜態目錄名稱為 static, 且 template 名稱為 templates, 因此在最基本的 Flask 程式架構中, 也需要自行建立這兩個目錄, 然後將靜態文件放入 static 目錄中, 而對應的 template 文件檔案, 則放入 templates 目錄中.","title":"yen - 網際 Flask 程式架構","tags":"Tutorial"},{"url":"http://project.mde.tw/blog/yen-ji-jie-she-ji-zhuan-ti-sui-shen-kai-fa-dian-nao.html","text":"此項測試目的在利用樹莓派卡片電腦, 以無線網路取得區域網路 IP, 然後從電腦教室中的 Windows 10, 以 X-Windows Server 連線到 Raspberry Pi 電腦系統, 嘗試讓機械設計工程學員評估, 能否在 Windows 10 與隨身的 Ubuntu 電腦系統間, 搭建合用的協同產品開發環境. Windows 10 環境中擬採用的 X-Windows Server: https://sourceforge.net/projects/xming/ Raspberry Pi 擬安裝操作系統: Ubuntu Server + sudo apt-get install ubuntu-desktop 樹莓派採購清單: 操作步驟: 完成清單中的樹莓派硬體採購 在樹莓派中安裝即將推出的 Ubuntu 16.04 LTS Server 版本, 加上 ubuntu-desktop. 測試如何在 http://cadlab.mde.tw 電腦輔助設計室中利用樹莓派的內建 Wifi 取得固定 IP 測試如何在樹莓派系統中以 IPV6 環境上網, 或在樹莓派系統中植入 IPV6 與 IPV4 雙支援, 並安裝 squid Proxy Server, 測試樹莓派在純 IPV6 環境中, 擔任區域網路代理伺服器的效能. 利用本地端的 Windows 10 Professional, 啟動 xming 伺服器後, 以 putty 加上 X11 forwarding 設定, 從 Windows 10 連線到樹莓派, 然後在 Ubuntu 中安裝 Leo Editor, Jupyter, Flask 與 Weppy 等相關機械設計專題工具, 並利用 Firefox 連線到 Onshape, 測試各項工具的使用效能. 完成上述各項任務後, 將流程與心得留在各組對應的機械設計專題倉儲中, 若過程中有些資料不適合在第1時間公開, 則另在 bitbucket 建 private 倉儲, 以五名協同者的編制進行管理. 上述流程中, 各學員同時考量該如何將心得整理為論文或專題報告 pdf 發表格式. 在 KMOL 知識地圖中的屬性: 四種主要的學門領域: 熱流、固力、電子電機 、資通. 六種表達方式: 口語 、文字、 2D、3D、理論分析 、實體 四種流程階段: 設計、 製造、控制 、管理 機械設計專題倉儲: https://github.com/2015fallproject","title":"yen - 機械設計專題隨身開發電腦","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-ji-jie-she-ji-zhuan-ti-cang-chu.html","text":"機械設計工程師在面對四種主要的學門領域, 六種表達方式, 以及四種開發流程階段的交互串聯下, 能否在分散式版次管理系統的協助中, 勇往直前? 四種主要的學門領域: 熱流、固力、電子電機、資通. 六種表達方式: 口語、文字、2D、3D、理論分析、實體 四種流程階段: 設計、製造、控制、管理 機械設計專題倉儲: https://github.com/2015fallproject","title":"yen - 機械設計專題倉儲","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-bian-yi-solvespace.html","text":"我們有沒有能力在機械設計專題中, 自行編譯 Solvespace, 並且了解其中的原理後, 新增自己需要的零件設計功能? https://github.com/whitequark/solvespace http://solvespace.com 自行編譯 solvespace: 從 http://www.activestate.com/activeperl/downloads 下載 ActivePerl, 並完成安裝. 下載並安裝 Visual Studio Express. 從 Visual Studio Express 表單中啟動 Dos Command. 進入 Solvespace Makefile 所在目錄, 執行 nmake. 就可以完成 Solvespace.exe 的編譯.","title":"yen - 編譯 Solvespace","tags":"Tutorial"},{"url":"http://project.mde.tw/blog/40323143-shuo-ming-ru-he-can-yu-xie-tong-ji-jie-she-ji-zhuan-ti-wang-zhi-bian-xie.html","text":"只要是具備協同權限的用戶, 都可以在機械設計專題網誌中貢獻內容 這裡為 40323130 所寫的文章主要內容 本機械設計專題網誌的架構包含近端與遠端的資料檢視設計, 專案資料以 Leo Editor 進行管理. 以下教學影片示範從 http://project.mde.tw 機械設計專題網誌中取得倉儲的網址後, 可以利用 git clone 複製倉儲資料, 之後: 利用 git checkout gh-pages 將工作目錄指到 Github pages 的對應分支內容 以 Leo Editor 開啟 users 目錄下的 user_template.leo 檔案 根據自己的帳號, 修改 .md 檔案存檔的名稱, 目的在透過加入帳號與時間註記, 避免 content 目錄中的檔案彼此複寫 在 .md 的 Title 標題中, 冠上自己的帳號, 主要也是避免 Pelican 將 .md 根據標題轉成 html 時, 產生檔案複寫 本系統的 Pelican 分為近端與遠端轉檔按鈕, 因此若要在近端檢查時, 與要推送到 Github 時採用不同轉檔按鈕 為了簡化 git 指令的 add, commit 與 push, 加入 ungit, 只要啟動隨身系統候, 再利用 start_ungit.bat 開啟, 就可以在瀏覽器中簡化改版過程 Vimeo: 2016project_1 from 虎尾科大機械設計工程 on Vimeo . Youtube:","title":"40323143 - 說明如何參與協同機械設計專題網誌編寫","tags":"2016g1"},{"url":"http://project.mde.tw/blog/40323123-3d-printer.html","text":"raspberry pi connect 3d printer to control the 3d printer 遠端控制3D列印 這邊使用的遠端列印是使用web client控制 目前有兩套在觀望的系統~ 一個是 octopi 另一個是 Astropromt 或者是我們自己寫一套 兩套皆使用樹梅派當為控制電腦及server 使用心得:在之前已經有安裝過octopi，使用狀況是不錯，但是gui介面有些許的問題，使用上是沒什麼大礙，在3D printer的控制板，做動方式，像是一般CNC一樣，接收 G指令 Gcoce 大全 控制系統的code解析 這兩套系統，都有開放原始碼，不過因為解析程式有巨大的阻礙，因為對python和樹梅派不熟悉，導致只會安裝不會自己編譯。","title":"40323123 - 3d printer","tags":"2016g1"},{"url":"http://project.mde.tw/blog/yen-ji-jie-she-ji-zhuan-ti-fen-lei.html","text":"機械設計專題題目的分類, 一般就學門領域的組合, 可視為熱流體力學, 固體力學, 電子電機與資訊科技的綜合體. 雖然機械設計專題, 以設計流程為主, 但是通常離不開製造、控制與管理的範疇. 也就是說, 機械設計流程必須納入製造、控制與管理的層面, 才能得到更大的價值. 機械指的是機巧的配置, 而配置的內容, 來自熱流體力學, 固體力學, 電子電機與資訊科技的內涵, 其中更因不同的設計、製造、控制與管理流程, 而產生不同的功用. 至於設計則隱含內容的表達與驗證, 其表達的方式通常指口語表達, 文字表達, 2D 圖形表達, 3D 影像表達, 理論分析表達與實體原型的表達等六大類. 因此機械設計專題, 就可以從熱流體力學, 固體力學, 電子電機與資訊科技的組合搭配中, 納入各種設計、製造、控制與管理工具的運用, 最後用表達方式加以呈現的差異, 進行分類. 換言之, 機械設計專題的題目與施行內容的分類, 可以從3個大軸向切入: 所包含的學門領域軸向, 也就是熱流體力學, 固體力學, 電子電機與資訊科技等. 所牽涉的流程層面, 也就是設計、製造、控制與管理流程等. 所使用的表達方式, 也就是口語表達, 文字表達, 2D 圖形表達, 3D 影像表達, 理論分析表達與實體原型的表達等. 其中隸屬於設計的工程設計面, 又可細分為: 選用設計, 也就是從現有的零件或配件群中選用的設計. 配置設計, 也就是根據所選擇的零配件加以組合, 以決定設計的組合順序或組合方式. 參數設計, 也就是決定內容所需的數據或尺寸. 原創設計, 也就是前所未見的配置參數設計或前所未見的整體設計. 重新設計, 也就是根據的新的需求、新的材料與元件發明, 所進行的設計. 客製化設計, 又稱為多選項設計, 也就是設計中的每一個功能, 都提供客戶不同等級的元件選擇所牽涉的設計. 總之, 這裡針對機械設計專題題目分類的目的, 在讓選擇專題題目與製作內容的成員能有些初步概念, 儘管機械設計的範圍很廣, 能夠採用的方式與納入的內容也很多, 但是只要關注機械設計所牽涉的領域、流程與表達方法, 使專題題目具有代表性與功能性, 就能讓最後交付的內容更具價值.","title":"yen - 機械設計專題分類","tags":"Misc"},{"url":"http://project.mde.tw/blog/40323130-shuo-ming-ru-he-can-yu-xie-tong-ji-jie-she-ji-zhuan-ti-wang-zhi-bian-xie.html","text":"只要是具備協同權限的用戶, 都可以在機械設計專題網誌中貢獻內容 這裡為 40323130 所寫的文章主要內容 本機械設計專題網誌的架構包含近端與遠端的資料檢視設計, 專案資料以 Leo Editor 進行管理. 以下教學影片示範從 http://project.mde.tw 機械設計專題網誌中取得倉儲的網址後, 可以利用 git clone 複製倉儲資料, 之後: 利用 git checkout gh-pages 將工作目錄指到 Github pages 的對應分支內容 以 Leo Editor 開啟 users 目錄下的 user_template.leo 檔案 根據自己的帳號, 修改 .md 檔案存檔的名稱, 目的在透過加入帳號與時間註記, 避免 content 目錄中的檔案彼此複寫 在 .md 的 Title 標題中, 冠上自己的帳號, 主要也是避免 Pelican 將 .md 根據標題轉成 html 時, 產生檔案複寫 本系統的 Pelican 分為近端與遠端轉檔按鈕, 因此若要在近端檢查時, 與要推送到 Github 時採用不同轉檔按鈕 為了簡化 git 指令的 add, commit 與 push, 加入 ungit, 只要啟動隨身系統候, 再利用 start_ungit.bat 開啟, 就可以在瀏覽器中簡化改版過程 Vimeo: 2016project_1 from 虎尾科大機械設計工程 on Vimeo . Youtube:","title":"40323130 - 說明如何參與協同機械設計專題網誌編寫","tags":"2016g1"},{"url":"http://project.mde.tw/blog/yen-xie-tong-chan-pin-she-ji-ke-cheng-task0-yan-shen-lian-xi.html","text":"如何將電腦教室分組, 比序與排座位的流程網際自動化 在 http://chiamingyen.github.io/kmolab/blog/2016-spring-cd-task0.html 中, 說明了一個實際的電腦教室排座位的流程, 其中使用了網際即時試算表 https://ethercalc.tw/ , 以及幾個 Python3 的資料處理程式, 最後可以根據電腦教室的配置, 完成各組員的座位編排. 座位編排流程如下: 讓所有學員自行分組 分組確定後, 根據學號比序, 產生各組組長 再根據各組組長學號, 再進行組長學號比序, 以決定各組的組序 完成各組序與各組內的組員順序後, 再根據座位編排規定, 最後列出學員座位表, 讓學員依序入座 本機械設計專題製作練習, 希望能夠利用網際程式方法, 以 https://github.com/mitsuhiko/flask , https://www.sqlite.org/ 將流程自動化, 當操作者從網際即時試算表中取得各組分組資料後, 可以輸入本練習所完成的網站表單中, 然後操作者可以根據頁面中的選項, 選擇各組選出組長的方式, 依據學號增量排序, 學號最小者為組長, 或遞減排序, 學號大者為組長, 或者亂數排序後, 排序第一組為組長等三種選擇. 接著操作者可以在頁面選擇組序排列的選項, 也是學號遞增排序, 學號遞減排序或學號亂數排序, 以便訂出各組的組序. 當操作者決定各組內與組外的排序選項後, 按下\"排電腦教室座位\" (也可加入排座位的選項, 列先排, 行先排或者全部按亂數排. 完成座位安排後, 必須將各組組員名單與分組名單分別存入資料庫, 以便後續讓使用者查詢各組座位與分組資訊, 並且在隨後 加入各組員回報電腦使用情形與各組員自評登錄成績之應用. 原始倉儲資料: https://github.com/2015fallhw/2016springcd/tree/gh-pages","title":"yen - 協同產品設計課程 Task0 延伸練習","tags":"Misc"},{"url":"http://project.mde.tw/blog/yen-github-pages-wang-ye-zi-liao-geng-xin-wen-ti.html","text":"突然間, Github Pages 的網頁轉換機制不再更新 使用 Github Pages 建立網頁最大的問題就是, 在完全沒有任何錯誤訊息提醒的情況下, 送到 Github Pages 對應分支倉儲的資料不再成功轉為網頁資料. 因應之道, 只能刪除原先不再更新的倉儲, 另外再建立一個對應的 Github Pages 倉儲, 重新進行各項設定.","title":"yen - Github Pages 網頁資料更新問題","tags":"Misc"},{"url":"http://project.mde.tw/blog/40323123-zhuan-ti-zu-yuan-de-fan-li-wen-zhang-biao-ti.html","text":"這裡放入 40323123 所寫的文章摘要 這裡為 40323123 所寫的文章主要內容","title":"40323123 - 專題組員的範例文章標題","tags":"2016g1"},{"url":"http://project.mde.tw/blog/user-shi-yong-zhe-de-fan-li-wang-zhi-wen-zhang-biao-ti.html","text":"這裡放入 user 所寫的文章摘要 這裡為 user 所寫的文章主要內容","title":"user - 使用者的範例網誌文章標題","tags":"Tutorial"},{"url":"http://project.mde.tw/blog/yen-2016-nian-zhuan-ti-qi-dong.html","text":"利用 Github Pages 與 Pelican 建立協同專題製作網誌 機械設計工程網誌啟動 本網誌自 2016 Spring 開始啟動, 相關建置步驟如下: 以 https://github.com/coursemdetw 帳號建立 Gihub 倉儲 https://github.com/coursemdetw/project_site 將倉儲資料 git clone 到近端 利用 git branch 指令, 建立 gh-pages 分支 利用 git checkout 指令, 切換至 gh-pages 分支 開始建立 Pelican 網誌所需的協同架構資料 安排 users 目錄, 將分別存放各協同組員的 .leo 檔案 確定 gh-pages 分支中的網誌 http://coursemdetw.github.io/project_site/ 可以正常運作 根據 Github pages 專用網域設定說明 https://help.github.com/articles/using-a-custom-domain-with-github-pages/ , 建立 CNAME, 納入 project.mde.tw 將 https://github.com/coursemdetw/project_site 倉儲的 Default Branch 設為 gh-pages 分支 在 mde.tw 網域的 DNS 代管設定中, 加入 project.mde.tw 與 coursemdetw.github.io 之間的 CNAME 別名設定 等待 CNAME 別名生效後, http://project.mde.tw 即可正常連結使用 Pelican 網誌設定 由於本網誌將 Pelican https://github.com/getpelican/pelican 設定相關的所有資料都留在 Gihub 倉儲 https://github.com/coursemdetw/project_site 中, 目的在讓其他人可以參考本網誌的所有細節內容. 一般在實際應用, 只需將 blog 目錄 https://github.com/coursemdetw/project_site/tree/gh-pages/blog 中的資料送到全球資訊網伺服器即可. 本專題製作採用 http://leoeditor.com/ 管理所有資料, 但各參與協同的人員各自在 users 目錄下擁有一個 .leo 檔案, 可以分別控管本網誌的所有設定, 並且以協同方式維護網誌內容. 本網誌分為近端與 Github Pages 端的資料管理配置, 關鍵字搜尋採用 https://github.com/getpelican/pelican-plugins/tree/master/tipue_search , 近端的設定檔案為 local_publishconf.py, 而 Github Pages 端的特有設定為 publishconf.py, 且為了區隔兩端的資料連結差異, 近端的 Pelican 轉檔按鈕為 @button local pelican, 而 Github Pages 端的轉檔按鈕為 @button gh-pages pelican. 最後, 為了有效區隔各組員所寫的網誌文章, content 目錄內的各 .md 檔案, 除了要求必須冠上組員帳號外, 也希望在文章標題前面加上組員帳號標示, 以避免組員間因為使用相同的文章標題名稱而無法正確完成 Pelican 網誌的轉檔 (本系統採用自動文章標題轉換為 html 檔名的設定). 組員參與協同 所有專題製作成員均為 https://github.com/coursemdetw/project_site 倉儲的協同者, git clone 資料後, 即可將分支固定在 gh-pages 後進行各項資料協同管理的工作. 參與協同的步驟: git clone 倉儲資料. 確定在近端已經切換分支到 gh-pages, 利用 Leo Editor 開啟 users 目錄下的 user_template.leo 檔案. 修改 @edit user_20160301.md 的標題與內容, 例如, 將 @edit user_20160301.md 改為 @edit 學號_20160301.md, 且將 \"Title: user - 使用者的範例網誌文章標題\" 改為 \"Title: 學號 - 使用者的範例網誌文章標題\", \"Author: user\" 改為 \"Author: 學號\" 之後, 記得將已經修改過的 user_template.leo 存為 學號.leo 檔案. 在學號.leo 專案檔案中, 將滑鼠停在 @button local pelican 節點上, 再點擊 local-pelican 按鈕進行轉檔, 最後利用瀏覽器開啟 project_site 目錄中的 index.html, 檢查是否在近端可以正確轉檔. 若近端的 Pelican 網誌可以正確納入所新增的文章內容, 改將滑鼠停在 @button gh-pages pelican 節點上, 再點擊 gh-pages-pelican 按鈕, 進行 Github Pages 端所需要的內容轉檔. 利用 git add -A, git commit -m \"訊息\", git push origin gh-pages 等3個步驟, 將 gh-pages 分支資料, 提交並推送到 http://project.mde.tw 網誌資料儲存規劃 一個靜態網站的內容除了文字檔案外, 還包括 Javascript 檔案, Brython 檔案, 圖檔, 影片檔案, 以及其他各種非 html 的文件檔, 為了保有本網誌專案倉儲的簡潔, 除了必要的設定與文字檔案外, 其他資料均存放在倉儲以外的相關資源位置, 其規劃如下: Javascript 與 Brython 程式檔案, 除了儘量使用各 CDN 所提供的最新版本外, 目前以 https://github.com/2015fallhw/cptocadp/tree/master/static 對應的 OpenShift 網站存放, 例如, Cango-8v03.js 位於 http://cptocadp-2015fallhw.rhcloud.com/static/Cango-8v03.js 一般圖檔與非 html 文件檔案, 建議以 Github Pages 的網頁架構儲存在獨立的倉儲中, 且該倉儲僅存放檔案, 而無文字檔案, 例如: http://coursemdetw.github.io/project_site_files/files/kmol_1172x340_color_3yrs.png 即為其中的一個圖檔. 影片檔案則分別存在 https://vimeo.com/ 與 https://www.youtube.com/ (相同檔案各存一份). 圖檔引用 影片檔引用 Gocycle_disassemble from 虎尾科大機械設計工程 on Vimeo . 特別提醒 本網誌為了同時支援近端與遠端的資料內容使用, 資料轉檔分為近端按鈕與遠端按鈕, 協同成員在推送資料到遠端之前, 必須確定資料為遠端 Github Pages 格式. 鼓勵各成員深入研究本網誌的細節架構, 勇於提出問題, 解決問題, 打造出最適合機械設計工程團隊使用的網際協同架構、模式與系統工具.","title":"yen - 2016 年專題啟動","tags":"Tutorial"}]};