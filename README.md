put.io.js-v2
============

[![NPM](https://nodei.co/npm/put.io-v2.png)](https://nodei.co/npm/put.io-v2/)

Node-only javascript library for the put.io API. I'd make it work in the browser too, but this version of the api is incompatible with such tomfoolery.

Install
-------
	npm install put.io-v2

Use
---

It works like this.

	var PutIO = require('put.io-v2');
	
	var api = new PutIO(oauth_token);
	
	api.files.list(0, function(data){
		for (var i in data.files){
			console.log(data.files[i].name);
		}
	});
	
	api.transfers.add('http://superfancytorrentsite.com/legal-torrents/the-entire-internet.torrent');

Everything is asynchronous and so you must pass callbacks.
The one exception is the files.download method, which returns the URL of the file.
Because honestly, downloading files to your disk isn't really within the scope of this library.

	var download_url = api.files.download(file_id));
	console.log(download_url);

And now, for a complete listing of every method available, their parameters, and their defaults.
Any parameter without a default value is necessary, and you'll get a missingParameter exception if you don't give it.
noop means No operation. It is function(){}

Files
=====

	api.files.list(parent_id=0, callback=noop);
	api.files.search(query, page=1, callback=noop);
	api.files.createFolder(name, parent_id=0, callback=noop);
	api.files.get(id, callback=noop);
	api.files.delete(file_ids, callback=noop); //accepts file_ids in the form of "1,2,3" or [1,2,3], or just 1
	api.files.rename(file_id, name, callback=noop);
	api.files.move(file_ids, parent_id=0, callback=noop); //accepts file_ids in the form of "1,2,3" or [1,2,3], or just 1
	api.files.make_mp4(id, callback=noop);
	api.files.get_mp4(id, callback=noop);
	api.files.download(id);

Transfers
=========

	api.transfers.list(callback);
	api.transfers.add(url, parent_id=0, extract=false, callback=noop);
	api.transfers.get(id, callback=noop);
	api.transfers.cancel(transfer_ids, callback=noop); //accepts transfer_ids in the form of "1,2,3" or [1,2,3], or just 1

Friends
=======

	api.friends.list(callback=noop);
	api.friends.waitingRequests(callback=noop);
	api.friends.request(username, callback=noop);
	api.friends.deny(username, callback=noop);

If you want to use v1 of the API, [this is the droid you're looking for](https://github.com/devTristan/put.io.js).
