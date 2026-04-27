#include "participant.h"
#include <iostream>

// Constructor
Participant::Participant(const string& first, const string& last, const string& participantEmail, const string& participantRole, int participantPoints){
    firstName = first;
    lastName = last;
    email = participantEmail;
    role = participantRole;
    points = participantPoints;
}

// Getter
string Participant::getName() const {
    return firstName + " " + lastName;
}

string Participant::getEmail() const{
    return email;
}

int Participant::getPoints() const{
    return points;
}

// Setter

void Participant::setEmail(string newEmail) {
    email = newEmail;
}

void Participant::setPoints(int newPoints) {
    points = newPoints;
}

void Participant::addPoints(int pointAmt) {
    points += pointAmt;
}


void Participant::lessPoints(int pointAmt) {
    points -= pointAmt;
};