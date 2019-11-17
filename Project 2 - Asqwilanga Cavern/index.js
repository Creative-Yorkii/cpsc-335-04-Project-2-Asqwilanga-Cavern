//	Anthony Goossens
//	CWID 890208523
//	CPSC 335-04 - Project 2 Asqwilanga Cavern
//	Due Date: 11/16/19
function startPath(){

		var u = [Number(document.getElementById("sxPoint").value), Number(document.getElementById("syPoint").value), Number(document.getElementById("szPoint").value)];
		var d = [Number(document.getElementById("txPoint").value), Number(document.getElementById("tyPoint").value), Number(document.getElementById("tzPoint").value)];
		var max = [Number(document.getElementById("mxPoint").value), Number(document.getElementById("myPoint").value), Number(document.getElementById("mzPoint").value)];
		start(u,d,max);
}

function startDefaultPath(){
	//These are the Default values if the use clicks "Use Default Path"
	var x = 16;
	var y = 0;
	var z = 0;
	var u = [x,y,z];

	//This is the end destination if "Use Default Path" is used
	var d = [8,1,7];

	//THhe limit of the Cave Search
	var max = [16, 9,7];

	start(u, d, max);

}

function start(u, d, max) {//startingPoint, destination, maximums
	//list of coords
	var treached = false;
	var positions = [];
	var visited = [];
	positions.push(u);
	visited.push(u);

	var s = ["", "",""];
	s[0] = u[0];
	s[1] = u[1];
	s[2] = u[2];

	for(var i = 0; i < 6; i++)
	{
	//Initialize new coordinates from given last positions / coordinates
	var t = ["", "",""]; 
	t[0] = s[0];
	t[1] = s[1];
	t[2] = s[2];
	console.log(t);
	//Recieve the next position / coordinates
	t = getNextPoint(t, max, i);

	//This function ensures that the position / coordinate has not yet been visited
	if(checkNotDuplicate(t, visited)) {
	positions.push(t);
	visited.push(t);
	//Saved the visited coordinate / position
	s[0] = t[0];
	s[1] = t[1];
	s[2] = t[2];
	i = -1;
	}

	//If the target is reacged, break out of the loop
	if(targetReached(t, d)){
		treached = true;
		break;
	}

	if(i === 5)
	{
		if(positions.length > 0 )
		{
			visited.push(positions[positions.length -1]);
			positions.pop();
			if(positions.length > 0)
			{
			var fa = [];
		    fa = positions[positions.length-1];
		    s[0] = fa[0];
			s[1] = fa[1];
			s[2] = fa[2];

			console.log("POPPIN" + fa[0]);
			}
			i = -1
		}
	}
	}
	if(treached == false)
	{
		visited.push("NO PATH FOUND");
	}
	printRoute(visited);
}

function getNextPoint(position, max, state){

	//Positions
	var pos1;
	var pos2;

	//States
	//A->B
	if(state == 0)
	{
	console.log("A->B");
	pos1 = 0; pos2 = 1;
	}
	//A->C
	if(state == 1) 
	{
	console.log("A->C");
	pos1 = 0; pos2 = 2;
	}
	//B->C
	if(state == 2)
	{
	console.log("B->C");
	pos1 = 1; pos2 = 2;
	}
	//C->A
	if(state == 3)
	{
	console.log("C->A");
	pos1 = 2; pos2 = 0;
	}
	//C->B
	if(state == 4)
	{
	console.log("C->B");
	pos1 = 2; pos2 = 1;
	}
	//B->A
	if(state == 5)
	{
	pos1 = 1; pos2 = 0;
	}

	if(position[pos1] == 0)//If position 1 is empty ,return
	{
		return position;
	}

	else if (position[pos2] == max[pos2]) //If position 2 is empty, return
	{
	 	return position;
	}

	else //Fill in position 2 as much as possible from postion 1 information
	{
		return position = fill(position, pos1, pos2, max);
	}
}

function fill(position, pos1, pos2, max){	//Fills in the coordinates / position
	var tempMaxAdd = max[pos2] - position[pos2];
	if(tempMaxAdd > position[pos1])
	{
		position[pos2]+= position[pos1]
		position[pos1] = 0;
		
	}
	else if(tempMaxAdd == position[pos1])
	{
		position[pos2] = max[pos2];
		position[pos1] = 0;
	}
	else //If it comes to this, A is greather than B and we need to get the max
	{
		position[pos1] -= tempMaxAdd;
		position[pos2] += tempMaxAdd;
	}
	return position;	
} //End of function, filling in positions / coordinates

function checkNotDuplicate(position, positions){	//Checks for duplicates
	for(var i = 0; i < positions.length; i++)
	{
		if(positions[i][0] == position[0])
		{
			if(positions[i][1] == position[1])
			{
				if(positions[i][2] == position[2]) return false;
			}
		}
	}	
	return true;
}

function targetReached(position, target){ //Checks to see if the target position / coordinates has been reached
	if(target[0] == position[0])
	{
		if(target[1] == position[1])
		{
			if(target[2] == position[2])
			{
				return true;
			}
		}		
	}
	return false;
} 	

function printRoute(positions)	//Outputs the current position / coordinates
{
var temp = "";
temp+=("["+positions[0] + "]" + "<br>");
for(var i = 1; i < positions.length; i++)
{
for(var j = 0; j < i; j++)
{

temp+= "&nbsp";
}
temp+=("["+positions[i] + "]" + "<br>");
}

document.getElementById("display").innerHTML = temp;
}