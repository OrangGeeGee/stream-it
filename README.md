stream-it
========

This lets you launch [peerflix](https://www.npmjs.com/package/peerflix) via http request.

```shell
npm install
npm start
```

Will launch the app on default port `8080`. Set env variable `PORT` to a different port if you need.

Then make a request like so:
```shell
wget -O- http://localhost:8080/stream?torrent=<link-to-.torrent-or-magnet-link-url>`
```
and command `peerflix \'' + req.query.torrent + '\' --vlc` will be executed on new `gnome-terminal`