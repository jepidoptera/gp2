# gp2
Class project 2

                            "The Barker"--Whatever the app is called

Requirements:


* [ ] Authentication
* [ ] Use a Node and Express Web Server
* [ ] Be backed by a MySQL Database an ORM (not necessarily Sequelize)
* [ ] Have both GET and POST routes for retrieving and adding new data
* [ ] Be deployed using Heroku (with Data)
* [ ] Utilize at least one new library, package, or technology that we haven’t discussed
* [ ] Have a polished frontend / UI
* [ ] Have folder structure that meets MVC Paradigm
* [ ] Meet good quality coding standards (indentation, scoping, naming)
* [ ] Must not expose sensitive API key information on the server, see [Protecting-API-Keys-In-Node.md](../../../10-nodejs/03-Supplemental/Protecting-API-Keys-In-Node.md)




* = Stretch goal

If there is anything you'd like to help with feel free. This is just a rough layout of the app. 
See the images folder 


David: 

Authentication: 
    -Username
    -Password
    *Email + link sent to user when message/swipe right received
    *Confirm you are not a robot

Peter:
    -Uploading/downloading pictures
    -Connecting to Heroku + JawsDB
    -Maps of area and local matches
    

Angela + David
    HTMl-CSS-JS
        Sign in Page
            - Username
            - Password
            - Create new account
                -modal
            - Trouble Signing in?
            - Forgot password/username
                - Email to reset password (with link?)

        Password Reset Page
            - New email
            - New password
            - Confirmation email for pw reset

        Home Page
            - Nav Bar
            - Left Div
                - Profile
                - Matches/Messages
            - Right Div
                - Pictures of matches
                    - Swipe R/L/U/D/space
                        - Swiping right makes users profile summary visible
                        - Space = next photo
        Profile Page
            - Left div scrolling settings
                "Discovery Settings"
                    - Max Distance
                    - Looking For
                    - Age Range
                    - Breed
                    - "Show me on" ---name of app
                    - Notifications

                "Notifications"
                    -Email
                    -Push Notifications(?)

                "Contact Us"
                    -Help and Support

                "Account Settings"
                    - Email
                    - Phone Number

                "Logout"

                "Delete Account"

            - Right Div 
                - Profile Pic    

        Delete Account Confirmation Modal

Angela:
    *Doggy Blog




Api Requests: Bryan

    Possible Api's:
        Image Upload/Download-See Nates message on Slack
            https://apidocs.imgur.com/#authorization-and-oauth
        

        Humane Society/Adoption Api

        Pet Finder
            https://www.petfinder.com/developers/v2/docs/

