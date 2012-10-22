
<?php
 $api_key = "69ec61b6e4a407a91eb6946b224cb0e1";
 $secret = "1cc6ff1c5a480085";
 $perms = "write";


 session_start();
 $_SESSION['frob'] = $_GET['frob'];
 
 function login_link() {
   	$frob = trim($_GET['frob']);

  return $frob;
 }

 $url = login_link();
?>

<html>
 
<head>
		<link rel="stylesheet" type="text/css" href="../css/main_page.css" />
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
		<script type="text/javascript" src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
		
 		<!--Custom Script-->
        <script src="../rohan/main4.js"></script>
		<script src="../rohan/md5.js"></script>
		
        <style type="text/css">
		
		</style>
		
	</head>
	<body>
		<h id="frob" style="display:none;"><?php echo $url;?></h>
		<div id="headbanner">
			<div id= "logo">flaunt<span id="r">r</span></div>
			<div id="auth"><a id="getsets"><div id="authbutton">GET SETS</div></a></div>
			<div id="userinfo"> </div>
		</div>
		<div id="content-left">
			<div id="content-gallery">
				<div class="scroll-pane">
	    			<div class="scroll-content">
	        			<div class="scroll-content-item">
						
						</div>
	            	</div>
	        		<div class="scroll-bar-wrap">
	       				<div class="scroll-bar">
	            		</div>
	            	</div>
				</div>
			</div>
			<div id="albumscrollerwrapper">
				<div id="albumtab">Albums</div>
				<div id="albumscroller">
					<div id="sets">
						<ul>
							<li></li>
						</ul>
					</div>
				</div>
			</div>
		</div>		
		<div id="content-right" class="rightzone">
    	   	<h2 class = "tagheads">Tags</h2>
    	   	<input type="button" value="save"/>

        	<div id="content-tags">
			<input type="text" name="tag" id="tag"/>
      <br>
			<!--<input type="button" id="gettags" value="Suggest Tags"/> 
			<div id="tag-finder">-->
				<ul>
				</ul>
			</div>
		</div>
<div id="content-right-gallery" class="rightzone">
        <h2 class="tagheads">Gallery</h2>  
  <div id="content-right-galleryimg"></div><br>
<div id="content-right-gallerytag">  
<ul>
<li></li>
 <ul> 
  </div><br><br>
<div id="tagtrash">

</div>
</div>


		</div>
		
	</body>

</html>