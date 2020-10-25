$(function(){
				var musicList=["0.mp3","1.mp3","2.mp3","3.mp3"];
				var photoList=["0.jpg","4.jpg","5.jpg","6.jpeg"];
				var num=0;//当前歌的位置
				var Deg=0//光盘转动角度
				var timer;//声明计时器
				var flag=$("#Mp3")[0];
				$("#suspend").click(function(){
					$(this).removeClass();
					if(flag.paused){//判断当前是否在播放状态，从而做出不同反应
						StartTurning();//调用启动旋转，机械臂
						flag.play();
					}else{
						StopTurning();//禁用启动旋转，机械臂
						flag.pause();
					}
				})
				$("#Mp3").bind('ended',function(){
					$("#suspend").removeClass();
					StopTurning();
					Deg=0;
				})
				$(".Lastsong").click(function(){
					num--;
					num=num < 0 ? musicList.length-1 : num;//判断上一首无歌时，播放最后一首歌
					PlayFuntion();//调用播放音乐函数
				})
				$(".Nextsong").click(function(){
					num++;
					num=num > musicList.length-1 ? 0 : num;//判断下一首无歌时回到第一首歌
					PlayFuntion();//调用播放音乐函数
				})
				function PlayFuntion(){//播放音乐函数
					$("#player").attr("src","music/"+musicList[num]);//切换下一首
					$(".bg").attr("src","img/"+photoList[num]);//切换图片
					StartTurning();//调用启动旋转，机械臂
					flag.load();//重新加载audio元素
					flag.play();//开始播放
				}
				function StartTurning(){//开启计时器旋转转盘
					var play=$("#suspend").attr('class');
					if(play === 'suspend2'){//判断是否播放状态，是则无需再次启动计时器,跳出函数
						return false;
					}
					$("#suspend").removeClass(play).addClass("suspend2");//按钮变成播放状态
					$(".tentacles img").css("transform","rotate(2deg)");//机械臂呈播放状态
					timer = setInterval(function(){
						Deg++;
						$(".disk").css("transform","rotate("+Deg+"deg)");
					},50)
				}
				function StopTurning(){//关闭计时器停止转盘
					$("#suspend").addClass("suspend1");
					$(".tentacles img").css("transform","rotate(15deg)");//机械臂呈暂停状态
					clearInterval(timer);
				}
			})