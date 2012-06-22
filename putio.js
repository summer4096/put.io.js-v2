var https = require('https');
var url_parse = require('url').parse;
var url_format = require('url').format;

var PutIO = function(token){
	var token = token;
	var api = 'https://api.put.io/v2/';
	
	var def = function(variable, defaultValue){
		return (variable === undefined) ? defaultValue : variable;
	};
	var need = function(variable){
		if (variable === undefined) {throw 'missingParameter';}
	};
	
	var request = function(method, path, query, callback){
		query.oauth_token = token;
		
		var options = url_parse(api+path);
		options.method = method;
		options.path += url_format({'query': query});
		
		https.request(options, function(res){
			var data = '';
			
			res.on('data', function(chunk){
				data += chunk;
			});
			res.on('end', function(){
				callback(JSON.parse(data));
			});
		}).end();
	};
	var get = function(path, query, callback){
		request('GET', path, query, callback);
	};
	var post = function(path, query, callback){
		request('POST', path, query, callback);
	};
	
	var noop = function(){};
	
	this.files = {};
	this.files.list = function(parent_id, callback){
		parent_id = def(parent_id, 0);
		callback = def(callback, noop);
		
		get('files/list', {'parent_id': parent_id}, callback);
	};
	this.files.search = function(query, page, callback){
		need(query);
		page = def(page, 1);
		callback = def(callback, noop);
		
		get('files/search/'+encodeURIComponent(query)+'/page/'+page, callback);
	};
	this.files.createFolder = function(name, parent_id, callback){
		need(name);
		parent_id = def(parent_id, 0);
		callback = def(callback, noop);
		
		post('files/create-folder', {'parent_id': parent_id, 'name': name}, callback);
	};
	this.files.get = function(id, callback){
		need(id);
		callback = def(callback, noop);
		
		get('files/'+id, callback);
	};
	this.files.delete = function(file_ids, callback){
		need(file_ids);
		callback = def(callback, noop);
		
		if (typeof(file_ids) == 'object'){ file_ids = file_ids.join(','); }
		
		post('files/delete', {'file_ids': file_ids}, callback);
	};
	this.files.rename = function(file_id, name, callback){
		need(file_id);
		need(name);
		callback = def(callback, noop);
		
		post('files/rename', {'file_id': file_id, 'name': name}, callback);
	};
	this.files.move = function(file_ids, parent_id, callback){
		need(file_ids);
		need(parent_id);
		callback = def(callback, noop);
		
		if (typeof(file_ids) == 'object'){ file_ids = file_ids.join(','); }
		
		post('files/move', {'file_ids': file_ids, 'parent_id': parent_id}, callback);
	};
	this.files.make_mp4 = function(id, callback){
		need(id);
		callback = def(callback, noop);
		
		post('files/'+id+'/mp4', callback);
	};
	this.files.get_mp4 = function(id, callback){
		need(id);
		callback = def(callback, noop);
		
		get('files/'+id+'/mp4', callback);
	};
	this.files.download = function(id){
		need(id);
		
		return api+'files/'+id+'/download?oauth_token='+token;
	};
	
	this.transfers = {};
	this.transfers.list = function(callback){
		callback = def(callback, noop);
		
		get('transfers/list', callback);
	};
	this.transfers.add = function(url, parent_id, extract, callback){
		need(url);
		parent_id = def(parent_id, 0);
		extract = def(extract, false);
		callback = def(callback, noop);
		
		post('transfers/add', {'url': url, 'save_parent_id': parent_id, 'extract': extract}, callback);
	};
	this.transfers.get = function(id, callback){
		need(id);
		callback = def(callback, noop);
		
		get('transfers/'+id, callback);
	};
	this.transfers.cancel = function(transfer_ids, callback){
		need(transfer_ids);
		callback = def(callback, noop);
		
		if (typeof(transfer_ids) == 'object'){ transfer_ids = transfer_ids.join(','); }
		
		post('transfers/cancel', {'transfer_ids': transfer_ids}, callback);
	};
	
	this.friends = {};
	this.friends.list = function(callback){
		callback = def(callback, noop);
		
		get('friends/list', callback);
	};
	this.friends.waitingRequests = function(callback){
		callback = def(callback, noop);
		
		get('friends/waiting-requests', callback);
	};
	this.friends.request = function(username, callback){
		need(username);
		callback = def(callback, noop);
		
		post('friends/'+encodeURIComponent(username)+'/request', callback);
	};
	this.friends.deny = function(username, callback){
		need(username);
		callback = def(callback, noop);
		
		post('friends/'+encodeURIComponent(username)+'/deny', callback);
	};
};

module.exports = PutIO;
