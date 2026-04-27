#ifndef PARTICIPANT_H
#define PARTICIPANT_H


#include <string>
using namespace std;


/**
* @file participant.h
* @brief Declaration of the Participant class.
* This file defines the Participant class, which stores and manages
* information about a participant, including their name, email, role,
* and points.
*/


/**
* @class Participant
* @brief Represents a participant with a name, email, role, and point total.
*/
class Participant {
public:


   /**
    * @brief Constructs a new Participant object.
    * @param first The participant's first name.
    * @param last The participant's last name.
    * @param participantEmail The participant's email address.
    * @param participantRole The participant's role.
    * @param participantPoints The participant's initial point total.
    */
   Participant(const string& first, const string& last, const string& participantEmail, const string& participantRole, int participantPoints);


   /**
    * @brief Returns the participant's full name.
    * @return A string containing the first and last name separated by a space.
    */
   string getName() const;


   /**
    * @brief Returns the participant's email address.
    * @return A string containing the participant's email.
    */
   string getEmail() const;


   /**
    * @brief Returns the participant's current point total.
    * @return An integer representing the participant's points.
    */
   int getPoints() const;


   /**
    * @brief Sets the participant's email address to a new value.
    * @param newEmail The new email address to assign.
    */
   void setEmail(string newEmail);


   /**
    * @brief Sets the participant's point total to a new value.
    * @param newPoints The new point total to assign.
    */
   void setPoints(int newPoints);


   /**
    * @brief Adds a pointAmt points to the participant's total.
    * @param pointAmt The number of points to add.
    */
   void addPoints(int pointAmt);


   /**
    * @brief Subtracts a points pointAmt from the participant's total.
    * @param pointAmt The number of points to subtract.
    */
   void lessPoints(int pointAmt);


private:


   string firstName;  // The participant's first name.
   string lastName;   // The participant's last name.
   string email;      // The participant's email address.
   string role;       // The participant's role.
   int points;        // The participant's current point total.
   string fullName;   // The participant's full name (first + last).
};


#endif
