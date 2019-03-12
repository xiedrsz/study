package com.xiedrsz.mypackage;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

public class Myplugin extends CordovaPlugin {

	private static String TAG = "myplugin";

	// cordova plugin
	private Context mContext;
	public CallbackContext callbackContext;
	public JSONObject jsonObj = new JSONObject();

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

		setCallbackContext(callbackContext);

		// some configure

		if (action.equals("action")) {
			// Todo
			return true;
		}

		return false;
	}

	public void setCallbackContext(CallbackContext callbackContext) {
		this.callbackContext = callbackContext;
	}

	// set the return result
	public void setresult(String result) {
		try {
			jsonObj.put("result", result);

			callbackContext.success(jsonObj);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			callbackContext.error(e.getMessage());
		}
	}
	// cordova plugin end

	// Todo
    // Edit other code bellowing
	
}
