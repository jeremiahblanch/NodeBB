'use strict';

var async = require('async');

var languages = require('../../languages');
var meta = require('../../meta');

var languagesController = module.exports;

languagesController.get = function (req, res, next) {
	async.waterfall([
		function (next) {
			languages.list(next);
		},
		function (languages) {
			languages.forEach(function (language) {
				language.selected = language.code === meta.config.defaultLang;
			});

			res.render('admin/general/languages', {
				languages: languages,
				autoDetectLang: meta.config.autoDetectLang,
			});
		},
	], next);
};

