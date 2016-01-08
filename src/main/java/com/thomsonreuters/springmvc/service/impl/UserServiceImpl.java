package com.thomsonreuters.springmvc.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.thomsonreuters.springmvc.IDao.UserDao;
import com.thomsonreuters.springmvc.domain.User;
import com.thomsonreuters.springmvc.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource
	private UserDao userDao;

	@Override
	public User getUserById(int userId) {
		// TODO Auto-generated method stub
		return this.userDao.selectByPrimaryKey(userId);
	}

}
