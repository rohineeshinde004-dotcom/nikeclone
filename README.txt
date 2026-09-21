==========================================================
 NIKE STORE CLONE
 BSc IT Mini Project   (HTML + CSS + JavaScript only)
==========================================================

1. HOW TO RUN
-------------
Double click on  index.html  and it opens in the browser.
(Chrome or Edge works best.) No server or software needed.

2. FOLDER STRUCTURE
-------------------
nike_project/
   index.html        -> Home page
   products.html     -> All products + search + filter + sort
   product.html      -> Product detail page (product.html?id=1)
   login.html        -> Sign In / Join Us + data.csv download
   cart.html         -> Bag with quantity and total calculation
   checkout.html     -> Delivery form + order summary
   order.html        -> Order placed page with bill
   about.html        -> About the project
   data.csv          -> Email and password file (opens in MS Excel)
   image_link.txt    -> List of all image files
   images/           -> Put all photos here (see HOW_TO_ADD_PHOTOS.txt)
   css/
      main_style.css      -> common design (header, footer, buttons, cards)
      home_style.css      products_style.css     product_style.css
      login_style.css     cart_style.css         checkout_style.css
      order_style.css     about_style.css
   js/
      main.js       -> product list + bag functions + user functions
      home.js       products.js    product.js     login.js
      cart.js       checkout.js    order.js       about.js

3. DEMO LOGIN (already saved)
-----------------------------
   Email : student@gmail.com   Password : 123456
   Email : teacher@gmail.com   Password : abc123

4. PHOTOS
---------
The project runs even without photos (a grey box is shown).
To add real photos, open  images/HOW_TO_ADD_PHOTOS.txt  and
follow the steps. Use free photos from Pexels / Unsplash /
Pixabay so that there is no copyright problem in submission.

5. ABOUT THE EXCEL FILE
-----------------------
A website made only with HTML, CSS and JavaScript cannot write
directly into a file on the computer, because the browser does
not allow it (security reason). So it is done in two steps :

  Step 1 : When a user does "Join Us", the email and password
           are saved in the browser (localStorage).
  Step 2 : On the login page click "Download data.csv".
           The file is downloaded. Right click it ->
           Open with -> Microsoft Excel.
           For .xlsx : in Excel use File -> Save As ->
           Excel Workbook (.xlsx).

6. HOW THE TOTAL IS CALCULATED
------------------------------
  Subtotal = price x quantity, added for all items in the Bag
  Delivery = Rs. 99, but FREE if the subtotal is Rs. 2999 or more
  Total    = Subtotal + Delivery

Written in js/main.js in the functions cartSubTotal(),
shippingCharge() and cartGrandTotal(). It runs again every time
the quantity is changed, so the total updates automatically.

7. IMPORTANT NOTE FOR SUBMISSION
--------------------------------
This is a STUDENT CLONE of the Nike India website, made only to
practise HTML, CSS and JavaScript for a college project. It is
not the real Nike website and has no connection with Nike Inc.
It is not used for any commercial purpose and no real order or
payment happens here. This note is also written in the footer of
every page and on the About page.
