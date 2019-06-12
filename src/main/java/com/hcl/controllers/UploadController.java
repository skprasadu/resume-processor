package com.hcl.controllers;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by XTL on 8/14/2014.
 */
@RestController
public class UploadController {

	@RequestMapping(value = "/uploadMasterListZip", method = RequestMethod.POST)
	@ResponseBody
	public void uploadMasterListZip(@RequestParam("file") MultipartFile file, HttpServletResponse response)
			throws Exception {
	}

	@RequestMapping(value = "/hello")
	public void hello() {
		System.out.println("Hello");
	}

}
