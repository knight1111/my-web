package com.thomsonreuters.modules.am.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.thomsonreuters.modules.am.IDao.UserDao;
import com.thomsonreuters.modules.am.domain.User;
import com.thomsonreuters.modules.am.service.IUserService;

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
