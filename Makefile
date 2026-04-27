all:
	make participant
	make main

participant: participant.cpp participant.h
	g++ -c participant.cpp

main: participant.o Main.cpp
	g++ -std=c++17 -I. Main.cpp participant.o -o server -lpthread

clean:
	rm -f server participant.o Main.o