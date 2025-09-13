# Pathan Blogger website

## servers
- there are 2 server one host on render and one host on vercel
- render give dynimeck data with databse
- vercel give statickly compute data
- unothorize user or unregisterd user see the statick data

## routes

admin\
- add blog
- update blog
- all admin blog
- popular blog
- delete blog
- all user
- delete user
- message a user
- data ( total blog view ,total visitor, total user ,total comment , total message , acticve user  )
- mail user

user\
- add blog
- like blog
- my blog
- all liked blog
- update blog
- delete blog
- login 
- registration
- my profile
- update profile
- follow a blogger
- unfollow a blogger
- all following
- my followers
- message a user
- mail admin

public\
- all blog
- latest blog
- popular blog
- all comment
- all user
- user profile

## dynamic data
- the user prosess data is dynimeckly lood 
- after login user can see only dynimeck data

## static data
- the unloged visitor see statick data on home page 
- admin post blog is starickly render 
- dumy user data is starickly render


# data types

user:
- id
- name
- email
- password
- photo
- baner photo (photo link)
- about me ("on 500 word")
- my blog ( user posted blog "id" )
- link ( facebook, twtter, youtub, linkdin, github, portfolio )
- date ( registration data )

blog:
- id
- Titel (string)
- short description (string)
- long description (html formet)
- date and time ( blog publishing date )
- view ( total view: total page lode )
- like (lotal likes: only user can give like)
- auther ( ho post the blog )

comment:
- id
- comment (string)
- date (when user give the comment)
- auther name (ho give the comment)
- photo (auther photo)
- profile (auther profile link)

admin:
- name
- password
- roll (admin)
- photo
- baner photo (photo link)
- about me ("on 500 word")
- my blog ( user posted blog "id" )
- link ( facebook, twtter, youtub, linkdin, github, portfolio )