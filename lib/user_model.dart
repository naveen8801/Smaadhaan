// To parse this JSON data, do
//
//     final userModel = userModelFromJson(jsonString);

import 'dart:convert';

UserModel userModelFromJson(String str) => UserModel.fromJson(json.decode(str));

String userModelToJson(UserModel data) => json.encode(data.toJson());

class UserModel {
  UserModel({
    this.name,
    this.problem,
    this.long,
    this.lat,
    this.phoneNumber,
  });

  String name;
  String problem;
  String long;
  String lat;
  String phoneNumber;

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
    name: json["name"],
    problem: json["problem"],
    long: json["long"],
    lat: json["lat"],
    phoneNumber: json["phone_number"],
  );

  Map<String, dynamic> toJson() => {
    "name": name,
    "problem": problem,
    "long": long,
    "lat": lat,
    "phone_number": phoneNumber,
  };
}
