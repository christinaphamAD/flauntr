flauntr
=======

Team Members: Christina Pham, Rohan Salantry, David Greis

- Christina Pham: Worked mostly on addressing the drag/drop behaviors of photos, 
generating tag buckets, adding delete functionality to the photos in tag buckets, and 
putting together the home login page. 
- Rohan Salantry: Worked on the authentication piece using yahoo for flickr. Worked on api's
for getting sets,images,auto-complete and posting tagged data to flickr.
- David Greis: I started off doing the CSS stylings of the page, but also drifted a lot
into the animations of the photo elements as they appeared. I also spent a lot of time 
finally figuring out how Github works.

Project Description (What it does, how you went about it, etc.)

This application will provide users with an easy interface that will allow people to 
pull up their photos from different sets and drag and drop them into "tag-buckets", 
allowing for consistent and easy mass-tagging. We also provided an autocomplete function
so that a list of suggested tags related to whatever you typed will show up, possibly
providing users with better alternatives or proper spelling. 

Features: 
- User sign-in and authentication
- Ability to create multiple tag buckets
- Drag and Drop feature to easily throw photos into tag buckets
- Ability to trash photos from tag buckets for users to change their minds
- Autocomplete that will pull up a list of suggested related tags based on what you type
- Gallery viewer so that users can view their photo at a bigger size and fetch tags related
  to the photo from flickr
- Update tags in flickr when it is added to a tag bucket.

Usernames we tested with: 
- closetbug
- dagreis

Technologies Used: 
- Christina Pham: jQuery, jQuery UI, Dreamweaver, TextWrangler (compare)
- Rohan Salantry: jQuery, jQueryUI, PHP, HTML/CSS
- David Greis: JQuery, CSS, GitHub, Javascript

URL of the Repository on Github:
- https://github.com/microcake/flauntr

Live URL of where it's hosted: 
- http://people.ischool.berkeley.edu/~rohans/flauntr/index.html

Browser Support:
- Looks fine on Chrome and Firefox. IE and Safari untested (currently)

Bugs/Quirks: 
- If you click on "Get Sets" too rapidly, it'll load up two sets of the same albums. 