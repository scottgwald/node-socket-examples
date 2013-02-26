remoteSlideshow
=============

Minimal node.js + socket.io app that shows how to create dashboard and view instances for a remote control effect.

# Notes

* Change the host url in index.html if you're not running it on localhost.

# Event support

* **keypress** broadcasts whatever data comes with it. The convention is
  meant to be that the data has a "keycode" attribute.

* **clientEvent** when a new client connects, it uses this event to say what
  kind of a client it is. The server uses this event to tell clients about 
  other clients -- for now, how many dashboards are connected.



