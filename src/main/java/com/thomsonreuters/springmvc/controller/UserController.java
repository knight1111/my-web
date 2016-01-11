package com.thomsonreuters.springmvc.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.thomsonreuters.springmvc.domain.User;
import com.thomsonreuters.springmvc.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource
	private IUserService userService;
	
	@RequestMapping(value = "/userList", method = RequestMethod.GET)
	public String toIndex() {
		return "um.userList";
	}

	@RequestMapping(value = "/showUser", method = RequestMethod.GET)
	public String showUser(@RequestParam String paramId, Model model) {
		int userId = Integer.parseInt(paramId);
		User user = this.userService.getUserById(userId);
		model.addAttribute("user", user);
		return "um.userPreference";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getJsonUser", method = RequestMethod.GET)
	public User getUserJson(@RequestParam String id) {
		int userId = Integer.parseInt(id);
		User user = this.userService.getUserById(userId);
		return user;
	}
}
