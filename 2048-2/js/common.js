function getPosTop(i,j){
	return 20+120*i;
}

function getPosLeft(i,j){
	return 20+120*j;
}
//获取数字背景颜色
function getNumbersBackgroundColor(num){
	switch(num){
		case 2:return "#c2eaf5"; break;
		case 4:return "#39d47b"; break;
		case 8:return "#3498db"; break;
		case 16:return "#9b59b6"; break;
		case 32:return "#f1c40f"; break;
		case 64:return "#27ae60"; break;
		case 128:return "#e74c3c"; break;
		case 256:return "#4cd137"; break;
		case 512:return "#e84118"; break;
		case 1024:return "#00a8ff"; break;
		case 2048:return "#fbc531"; break;
	}
}
//获取数字颜色
function getNumbersColor(nums){
	if(nums<=4){
		return "#776c65";
	}else{
		return "#fff";
	}
}

//判断是否还有空间
function noSpace(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}
		}
	}
	return true;
}
//判断是否可以向左移动
function canMoveLeft(nums){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i][j-1]==0 || nums[i][j]==nums[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否可以向右移动
function canMoveRight(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0 || nums[i][j]==nums[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}


function canMoveUp(nums){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0 || nums[i][j]==nums[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(nums){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0 || nums[i][j]==nums[i+1][j]){
					return true;
				} 
			}
		}
	}
	return false;
}

//判断水平方向上是否有障碍物
function noBlockHorizontal(row,col1,col2,nums){
	for(var i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}
//判断垂直方向上是否有障碍物
function noBlockVertical(col,row1,row2,nums){
	for(var i=row1+1;i<row2;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;
}
//更新分数
function updateScore(score){
	$("#score").text(score);
}
//判断是否还能移动
function noMove(nums){
	if(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) ||canMoveDown(nums)){
		return false;
	}
	return true;
}

//判断游戏是否结束 1.无法移动 2.没有空的单元格
function isGameOver(){
	if(noSpace(nums) && noMove(nums)){
		alert("Game Over! \n Your score is "+score+" !");
	}
}