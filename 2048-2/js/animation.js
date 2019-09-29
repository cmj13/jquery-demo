//通过动画显示数字
function showNumberWithAnimation(i,j,randNumber){
	var numbersCell=$("#numbers-cell-"+i+"-"+j)//找到单元格
	numbersCell.css("background-color",getNumbersBackgroundColor(randNumber));
	numbersCell.css("color",getNumbersColor(randNumber));
	numbersCell.text(randNumber);

	//设置动画效果
	numbersCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},500);
}
//通过动画显示移动单元格效果
function showMoveAnimation(fromx,fromy,tox,toy){
	var numbersCell=$("#numbers-cell-"+fromx+"-"+fromy);
	numbersCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200)
}