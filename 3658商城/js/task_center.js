function get_all_task_list(uid , to_top)
{
	var tabdiv = $("#m_task_dd_id");
	//var index = layer.load(1, {
	//	  shade: [0.1,'#fff'] //0.1透明度的白色背景
	//	});
	mlayer.load();
    $.ajax({
        url: 'task_center.php?act=ajax_all_task',
        type: 'POST',
        data:{page:1 , status:1},
        dataType: 'JSON',
        timeout: 10000,
        success: function(result){
        	if(result.code == 99)
        		{
        		 mlayer.closeAll();
        		 //layer.closeAll('loading'); //关闭加载层
        		 window.location.href="/member.html"; 
        		 return false;
        		}
        	if(result.code == 1)
        		{
        		 mlayer.closeAll();
            	tabdiv.html('');
            	tabdiv.html(result['result']);
            	$(".m_task_r").scrollTop(to_top);
            	return true;
            	
        		}
        }
    });
}
