<?php
class Time
{
	
	public static function GetData($url,$page=1,$pre_page=12)
	{	
		$data = file_get_contents($url);
		$data = json_decode($data);
		$data = self::ObjectArray($data)['ms'];
		$bbb= array();  
		for($i=0;$i<ceil(count($data)/$pre_page);$i++)  
		{  
		      $bbb[] = array_slice($data, $i * $pre_page ,$pre_page);  
		} 

		return json_encode($bbb[$page]);
	}

	public static function ObjectArray($array) {  
	    if(is_object($array)) {  
	        $array = (array)$array;  
	     } if(is_array($array)) {  
	         foreach($array as $key=>$value) {  
	             $array[$key] = self::ObjectArray($value);  
	             }  
	     }  
	     return $array;  
	}
}

$url = "http://api.yixi.tv/api/v1/album";
if(!empty($_GET['page'])){
		$page = $_GET['page'];
	}else{
		$page = 1;
	}
	if(!empty($_GET['pre_page'])){
		$pre_page = $_GET['pre_page'];
	}else{
		$pre_page = 12;
	}
$ms =  Time::GetData($url,$page,$pre_page);
print_r($ms);