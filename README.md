# PARK-O-METER

Finding open parking spots can really be a pain! We’ve all done the lap of shame before -- you’re driving to your favorite local restaurant in search of a good time, only to get there and loop around the same small lot four times before leaving in disgust and parking elsewhere. It’s a shame how often this happens in major cities, especially with how easy it can be avoided! It is often hard though to determine parking availability in most cities during peak business hours -- but that’s what Park-O-Meter is for! We designed this robust web application to display all vacant and occupied parkings spots around a location of your choosing, so you never have to take that lap of shame in your car again! Every minute spent searching for parking is another minute wasted that we could have used to spend more quality time with our loved ones, or to reduce pollution from our vehicles. With this, we hope to improve people’s quality of life and reduce our carbon footprint, one minute at a time.

## What it does

Park-O-Meter is a web application that highlights vacant and occupied parking spots around the user’s input location with different colored pins. The user will be asked either to use their current location, or a custom location, and will then be routed to the nearest open parking spot using Google Maps.

## Technical breakdown

We used geolocation APIs in order to get the latitude and longitude of locations inputted by the user, as well as two databases to get information for open parking meters in Los Angeles and their locations. This information was used combined with the Google Maps API to render a map with both markers of open parking meters and directions for the user. To further engage the user, we used Twilio to text the user when spots open up near their destination. To make our web application, we developed a Python Flask Backend with a Javascript React Frontend.

## Challenges we ran into

One of our biggest difficulties was getting the map to show up properly on our user interface. We had built our Google Maps separately from the user input screen, and so resizing and placing the map within the borders of our UI proved more difficult than we expected. Another difficulty was learning how to use the Google Maps API for the first time. Parsing information from the API was hard because we had to adjust to the syntax of API calls, and could not update the map accurately until the data was parsed correctly.

## Potential improvements

We could improve our refresh speeds on the map from every 15 seconds to real time. This is a big improvement because if the spot gets taken right after the user is routed to that spot, then they could avoid the headache of going to an already occupied spot. We also could find more unique markers or pins to use to show empty and occupied parking locations so the user has an easier time differentiating between the two.
