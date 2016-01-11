<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" session="false"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><tiles:getAsString name="title" /></title>
<link href="../resources/opensource/bootstrap/3.2.0/css/bootstrap.min.css"
	type="text/css" charset="UTF-8" rel="stylesheet" />
<link href="../resources/frontend/css/main.css" type="text/css"
	charset="UTF-8" rel="stylesheet" />
<link rel="stylesheet" type="text/css"
	href="../resources/opensource/datatables/1.10.7/integration/bootstrap/3/dataTables.bootstrap.css">
<script src="../resources/opensource/jquery/jquery-2.1.1.min.js"
	type="text/javascript"></script>
<script src="../resources/opensource/bootstrap/3.2.0/js/bootstrap.min.js"
	type="text/javascript"></script>
</head>
<body>

	<div id="top">
		<tiles:insertAttribute name="header" />
	</div>

	<div id="center">
		<tiles:insertAttribute name="content" />
	</div>

	<div id="bottom">
		<tiles:insertAttribute name="footer" />
	</div>

</body>
</html>