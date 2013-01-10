var WSet=Class.create(
	/** @lends WSet# */
{
	/**
		@param set the raphael set that this wraps
		@param wrapper the raphael wrapper (with paper and all)
	*/
	initialize: function(set,wrapper) {
		this.set=set;
		this.wrapper=wrapper;
	},
	push: function() {
		var m=this.set.push;
		var r=m.apply(this.set,arguments);
		return r;
	},
	remove: function() {
		var m=this.set.remove;
		var r=m.apply(this.set,arguments);
		return r;
	},
	forEach: function() {
		var m=this.set.forEach;
		var r=m.apply(this.set,arguments);
		return r;
	},
	/**
		@description make a set glow 
		@param glow_obj parameters to pass to the Raphael.js glow method
		@returns the set of glow objects
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	glow: function(glow_obj) {
		var nset=this.wrapper.set();
		this.forEach(function(e) {
			nset.push(e.glow(glow_obj));
		},undefined);
		return nset;
	},
	/**
		@description setup a click callback for a set
		@param set set to work on
		@param f callback. Callback should receive the type of the event
		@param names of events to register. supported are: click, mouseover, mouseout, mousemove
		@returns nothing
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	eventRegister: function(f,names) {
		var that=this;
		names.forEach(function(eventName) {
			that.forEach(function(e) {
				switch(eventName) {
					case 'click':
						e.click(function() {
							f(eventName);
						});
						break;
					case 'mouseover':
						e.mouseover(function() {
							f(eventName);
						});
						break;
					case 'mouseout':
						e.mouseout(function() {
							f(eventName);
						});
						break;
					case 'mousemove':
						e.mousemove(function() {
							f(eventName);
						});
						break;
					case 'mouseup':
						e.mouseup(function() {
							f(eventName);
						});
						break;
					case 'mousedown':
						e.mousedown(function() {
							f(eventName);
						});
						break;
					default:
						throw 'unknown event name '+eventName;
				}
			});
		});
	}
});

var WRaphael=Class.create(
	/** @lends WRaphael# */
{
	/**
		@class Paper wrapper for Raphael.js
		@description creates a new instance
		@param anything you pass to Raphael for initialization
		@returns a new instance of this class
		@constructs
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	initialize: function() {
		this.r=Raphael.apply(undefined,arguments);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	rect: function() {
		var m=this.r.rect;
		var r=m.apply(this.r,arguments);
		return r;
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	set: function() {
		var m=this.r.set;
		var r=m.apply(this.r,arguments);
		return new WSet(r,this);
	},
	/**
		@description toString method that allows you to get a nice printout for this type
		@author <a href="mailto:mark.veltzer@gmail.com">Mark Veltzer</a>
	*/
	path: function() {
		var m=this.r.path;
		var r=m.apply(this.r,arguments);
		return r;
	},
	text: function() {
		var m=this.r.text;
		var r=m.apply(this.r,arguments);
		return r;
	}
});
