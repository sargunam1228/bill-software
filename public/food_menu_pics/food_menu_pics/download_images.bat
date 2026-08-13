@echo off
setlocal
cd /d "%~dp0"
if not exist "images" mkdir "images"
echo Downloading menu images...

curl -L "https://dookan.com/cdn/shop/files/Idli_3pcs_chutney_sambar.png?v=1687874145&width=533" -o "images\01_Idli.png"
curl -L "https://commons.wikimedia.org/wiki/Special:Redirect/file/Dosa_(South_Indian_cuisine).jpg" -o "images\02_Dosa.jpg"
curl -L "https://b.zmtcdn.com/data/dish_photos/e23/d359196b8629964dad649216d0e2de23.jpeg" -o "images\03_Parotta.jpeg"
curl -L "https://commons.wikimedia.org/wiki/Special:Redirect/file/Indian_chapati.jpg" -o "images\04_Chapati.jpg"
curl -L "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/koa9kejjlclr2ulhzyeh" -o "images\05_Kothu_Parotta.jpg"
curl -L "https://c.ndtvimg.com/gws/ms/6-easy-indian-breakfasts-you-can-make-in-under-15-minutes/assets/7.png" -o "images\06_Omelet.png"
curl -L "https://cdn.uengage.io/uploads/64316/image-945889-1759505584.jpeg" -o "images\07_Kalaki.jpeg"
curl -L "https://hungryforever.net/wp-content/uploads/2018/10/nattukozhi-varuval-hf.jpg" -o "images\08_Nattu_Kozhi_Chicken_Fry.jpg"
curl -L "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Ce_grayscale%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2026/1/16/6935a7b2-1127-4ec4-acdf-c3d24392e276_14c86923-bb12-4dcf-9b93-006f1908c27e.png" -o "images\09_Mushroom_Dosa.png"
curl -L "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/wuxfbnuzsmknbzvxprja" -o "images\10_Plain_Dosa.jpg"
curl -L "https://d1w7312wesee68.cloudfront.net/ENcm85g7xfVvJSaiuMIG45rlSQQhgm_vgPvT8SReTKg/resize%3Afit%3A720%3A720/plain/s3%3A/toasttab/menu_service/restaurants/1d7a8dc0-6fa8-4a51-8efd-343c1c55cfdc/MenuItem/05361354-9c15-420d-b2b2-025a28a3b98b.png" -o "images\11_Onion_Dosa.png"
curl -L "https://www.dosanchutney.com/cdn/shop/files/OMELETTEDOSA.jpg?v=1713185032" -o "images\12_Omelet_Dosa.jpg"
curl -L "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_300%2Ch_300%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2024/8/4/f3bdb3b4-cb2e-4672-9b32-8d31977e4805_a3fa696c-9325-43d2-848c-7ae0fee93d02.jpg" -o "images\13_Full_Boil_Egg.jpg"
curl -L "https://yumyumrecipees.com/wp-content/uploads/2021/08/egg-poriyal.jpg" -o "images\14_Mutta_Poriyal.jpg"
curl -L "https://b.zmtcdn.com/data/pictures/chains/1/21777691/6ec8b0b4494f7199085ea6229e60d96a.jpg" -o "images\15_Chicken_Biryani.jpg"
curl -L "https://img-global.cpcdn.com/steps/068554b86e2f1cce/400x400cq80/photo.jpg" -o "images\16_Chapati_Kothu.jpg"
curl -L "https://shriandsam.com/cdn/shop/articles/egg-dosa-recipe-4926721.jpg?v=1763361655&width=700" -o "images\17_Mutta_Dosa.jpg"
curl -L "https://www.kannammacooks.com/wp-content/uploads/thattu-kadai-style-avicha-muttai-omelette-recipe-1-3.jpg" -o "images\18_One_Side_Omelet.jpg"

echo.
echo Done. Images are in the "images" folder.
pause
