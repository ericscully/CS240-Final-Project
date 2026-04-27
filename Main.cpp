#define ASIO_STANDALONE
#define CROW_MAIN
#include "crow_all.h"
#include "participant.h"
#include <string>
#include <vector>
#include <iostream>

int main() {
  crow::App<crow::CORSHandler> app;

  auto& cors = app.get_middleware<crow::CORSHandler>();
  cors.global()
    .origin("*")
    .methods("GET"_method, "POST"_method, "OPTIONS"_method)
    .headers("Content-Type");

  std::vector<Participant> participants;

  // DELETE /leaderboard
CROW_ROUTE(app, "/leaderboard/clear").methods("POST"_method)
([&]() {
    participants.clear();
    return crow::response(200, "Leaderboard cleared");
});

  // Helper: find by email
  auto findByEmail = [&](const std::string& email) -> Participant* {
    for (auto& p : participants) {
      if (p.getEmail() == email) return &p;
    }
    return nullptr;
  };

  // Helper: build JSON for one participant
  auto participantJson = [](const Participant& p) {
    crow::json::wvalue r;
    r["name"]   = p.getName();
    r["email"]  = p.getEmail();
    r["points"] = p.getPoints();
    return r;
  };

  // GET /leaderboard
  CROW_ROUTE(app, "/leaderboard").methods("GET"_method)
  ([&]() {
    crow::json::wvalue response;
    if (participants.empty()) {
      response = crow::json::wvalue::list();
      return crow::response{response};
    }
    for (size_t i = 0; i < participants.size(); i++) {
      response[i]["name"]   = participants[i].getName();
      response[i]["email"]  = participants[i].getEmail();
      response[i]["points"] = participants[i].getPoints();
    }
    return crow::response{response};
  });

  // POST /participant/create
  CROW_ROUTE(app, "/participant/create").methods("POST"_method)
  ([&](const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) return crow::response(400, "Invalid JSON");

    std::string firstName = body["firstName"].s();
    std::string lastName  = body["lastName"].s();
    std::string email     = body["email"].s();
    std::string role      = body["role"].s();

    if (findByEmail(email)) return crow::response(409, "Participant already exists");

    participants.emplace_back(firstName, lastName, email, role, 0);

    crow::json::wvalue r;
    r["name"]   = firstName + " " + lastName;
    r["email"]  = email;
    r["points"] = 0;
    return crow::response{r};
  });

  // POST /participant/addPoints
  CROW_ROUTE(app, "/participant/addPoints").methods("POST"_method)
  ([&](const crow::request& req) {
    std::cout << "Body: " << req.body << std::endl;
    auto body = crow::json::load(req.body);
    if (!body) return crow::response(400, "Invalid JSON");

    std::string email = body["email"].s();
    int amount        = body["amount"].i();

    Participant* p = findByEmail(email);
    if (!p) return crow::response(404, "Participant not found");

    p->addPoints(amount);
    return crow::response(participantJson(*p).dump());
  });

  // POST /participant/setPoints
  CROW_ROUTE(app, "/participant/setPoints").methods("POST"_method)
  ([&](const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) return crow::response(400, "Invalid JSON");

    std::string email = body["email"].s();
    int points        = body["points"].i();

    Participant* p = findByEmail(email);
    if (!p) return crow::response(404, "Participant not found");

    p->setPoints(points);
    return crow::response(participantJson(*p).dump());
  });

  app.port(18080).multithreaded().run();
}
