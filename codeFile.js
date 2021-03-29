var codeFile = {}
codeFile.getCode = () => ({
    init: function(elevators, floors) {
        elevators.forEach((elevator, index) => {
            elevator.index = index;
            elevator.on("floor_button_pressed", function (floorNum){
                //elevator.goToFloor(floorNum);
            });
            elevator.on("idle", () => {
                // console.log(index, "im idle")
            })
            elevator.on("passing_floor", (floorNum, direction) =>{
                // console.log("loadFactor", elevator.loadFactor());
                // if(elevator.loadFactor > 1 / elevator.maxPassangerCount()){
                //     elevator.goToFloor(getNextFloorDirection(floorNum, elevator.getPressedFloors(), direction));
                // }
            })
            elevator.on("stopped_at_floor", (floorNum) => {
                // console.log("Ive stoped at: ",floorNum);
                // console.log(floors[floorNum].buttonStates);
                floors[floorNum].buttonStates.up ? elevator.goingUpIndicator(true) : false;
                floors[floorNum].buttonStates.down ? elevator.goingDownIndicator(true) : false;
           })
            elevator.on("is_full", () => {
                console.log("The elevator is full");
            })
        })

        floors.forEach((floor, index) => {
            floor.on("up_button_pressed", () => newDestination(index, "up"));
            floor.on("down_button_pressed", () => newDestination(index, "down"));
        })

        function getNextFloorDirection(floorNum, pressedFloors, direction) {
            let mapped = pressedFloors.map(floor => abs(floorNum - floor));
            if(direction == "up"){
                return floorNum - 1
            }

        }
        function newDestination(onFloor, direction) {
            let elevator = elevators[0];
            //            for (let elevator of elevators) {
            // console.log("elevator",elevator)
            let currentFloor = elevator.currentFloor();
            // console.log("currentFloor", currentFloor);
            //elevator.goToFloor(onFloor);
            elevator.destinationQueue.push(onFloor);
            let newDestinations = Array.from(new Set(elevator.destinationQueue));
            //elevator.destinationDirection() == "up" ? newDestinations.reverse() : "";
            elevator.destinationQueue = newDestinations;
            elevator.checkDestinationQueue();
            // console.log(elevator.index, elevator.destinationQueue);
            //}
            // console.log(floors)
        }
    },
        update: function(dt, elevators, floors) {
            elevators.forEach(elevator => {
                let goingUp = elevator.destinationDirection() === "up";
                let goingDown = elevator.destinationDirection() === "down";
                elevator.goingUpIndicator(goingUp);
                elevator.goingDownIndicator(goingDown);
            })
            // console.log(dt, elevators, floors);
            // We normally don't need to do anything here
        }
});
