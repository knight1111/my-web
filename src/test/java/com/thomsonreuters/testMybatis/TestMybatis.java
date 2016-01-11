package com.thomsonreuters.testMybatis;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.thomsonreuters.modules.am.domain.User;
import com.thomsonreuters.modules.am.service.IUserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-mybatis.xml" })
public class TestMybatis {
	private static Logger logger = Logger.getLogger(TestMybatis.class);
	// private ApplicationContext ac = null;
	@Resource
	private IUserService userService = null;

	// @Before
	// public void before() {
	// ac = new ClassPathXmlApplicationContext("applicationContext.xml");
	// userService = (IUserService) ac.getBean("userService");
	// }

	@Test
	public void test1() {
		User user = userService.getUserById(1);
		 System.out.println(user.getUserName());
		// logger.info("值："+user.getUserName());
		// logger.info(JSON.toJSONString(user));
		logger.info(user.getUserName());
		logger.info(user.getPassword());
	}
}
