var nums = new Array();
var score=0;
hasConflicted = new Array();//已经已叠加，用来解决单元格重复叠加的问题
	
$(document).ready(function(){
	newGame();
});

function newGame(){
	init();

	getNumberOne();
	getNumberOne();

};
//初始化页面
//渲染格子
function init(){
	for (var i= 0;i<4;i++) {
		for(var j=0;j<4;j++){
			var girdCell = $("#gird-cell"+"-"+i+"-"+j);
			girdCell.css("top",getPosTop(i,j));
			girdCell.css("left",getPosLeft(i,j));
		}
	}
	//初始化数组
	for(var i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			nums[i][j]=0;
			hasConflicted[i][j]=false;//false表示未曾叠加过
		}
	}


	updateView();
	score=0;
	updateScore(score);
}

//动态生成单元格
function updateView(){
	$(".numbers-cell").remove();


	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$(".gird-container").append("<div class='numbers-cell' id='numbers-cell-"+i+"-"+j+"'></div>")

			var numbersCell=$("#numbers-cell-"+i+"-"+j);

			if(nums[i][j]==0){
			numbersCell.css("width","0px");
			numbersCell.css("height","0px");
			numbersCell.css("top",getPosTop(i,j)+50);
			numbersCell.css("left",getPosLeft(i,j)+50);
			}else{
			numbersCell.css("width","100px");
			numbersCell.css("height","100px");
			numbersCell.css("top",getPosTop(i,j));
			numbersCell.css("left",getPosLeft(i,j));
			numbersCell.css("background-color",getNumbersBackgroundColor(nums[i][j]));
			numbersCell.css("color",getNumbersColor(nums[i][j]));
			numbersCell.text(nums[i][j]);
			}
			hasConflicted[i][j]=false;
		}	
	}
}
//在随机的一个单元格中生成一个随机数
//在随机的空的单元格中找一个生成
//随机生成一个2或4
function getNumberOne(){
	//如果还有空间
	if(noSpace(nums)){
		return;
	}
	//随机一个位置
	var count=0;
	var temp=new Array();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]= i*4+j;//1*4+3==>7/4=1 7%4=3
				count++;
			}
		}
	}
	var pos=Math.floor(Math.random()*count);//[0,5]
	var randx=Math.floor(temp[pos]/4);
	var randy=Math.floor(temp[pos]%4);
	//随机一个数字
	var randNum=Math.random()<0.5?2:4;
	//随机位置显示数字
	nums[randx][randy]=randNum;
	showNumberWithAnimation(randx,randy,randNum);
}
//实现键盘响应
$(document).keydown(function(event){
	//阻止事件的默认值
	event.preventDefault();

	switch(event.keyCode){
		case 37://left
			//判断是否可以向左移动
			//要么左边为空或者相同
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(getNumberOne,200);
				setTimeout(isGameOver,800);
			}
		break;

		case 38://up
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(getNumberOne,200);
				setTimeout(isGameOver,800);
			}
		break;

		case 39://right
			//判断是否可以向右移动
			//要么右边为空或者相同
			if(canMoveRight(nums)){
				moveRight();
				setTimeout(getNumberOne,200);
				setTimeout(isGameOver,800);
			}
		break;

		case 40://down
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(getNumberOne,200);
				setTimeout(isGameOver,800);
			}
		break;
		default:
		break;
		
	}
});

/*
向左移动
	需要对每一个数字进行判断，并选择合适的落脚点
	1.落脚点没有数字，并且移动路径没障碍。
	2.落脚点数字和自己相同，并且移动路径没障碍。

*/
function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				for(var k=0;k<j;k++){
					//判断落脚点没有数字，并且移动路径没障碍。
					if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums)){//第i行的k-j列有没有障碍物
						//移动操作
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break					
					}else if(nums[i][j] == nums[i][k] && noBlockHorizontal(i,k,j,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						break;
					}
				}
			}
		}
	}
	//更新页面上的动画效果，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待500ms，为了单元格移动效果能够显示完
}


function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(nums[i][j]!=0){
				for(k=3;k>j;k--){
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){	////第i行的j-k列有没有障碍物
						showMoveAnimation(i,j,i,k);
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[i][k]==nums[i][j] && noBlockHorizontal(i,j,k,nums) && !hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						nums[i][k]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						break;
					}
				}
			}
		}
	}
	//更新页面上的动画效果，此处才是真正的更新显示移动后的效果
	setTimeout(updateView,200);//等待200ms，为了单元格移动效果能够显示完
}

function moveUp(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(nums[i][j]!=0){
				for(var k=0;k<i;k++){
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){ //第j列的第k-i行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,k,i,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
					}
					
				}
			}
		}
	}
	setTimeout(updateView,200);//等待200ms，为了单元格移动效果能够显示完
}

function moveDown(){
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(nums[i][j]!=0){
				for(var k=3;k>i;k--){
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){ //第j列的第i-k行之间是否有障碍物
						showMoveAnimation(i,j,k,j);
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;
					}else if(nums[k][j]==nums[i][j] && noBlockVertical(j,i,k,nums) && !hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						nums[k][j]+=nums[i][j];
						nums[i][j]=0;
						score+=nums[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
					}
				}
			}
		}
	}
	setTimeout(updateView,200);//等待200ms，为了单元格移动效果能够显示完
}