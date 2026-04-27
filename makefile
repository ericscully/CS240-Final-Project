all: test

participant.o: participant.cpp participant.h
    g++ -c participant.cpp

test: participant.o test.cpp
    g++ test.cpp participant.o -o test

clean:
    rm -f test participant.o