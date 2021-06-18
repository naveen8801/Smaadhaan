import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;

import 'user_model.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

Future<UserModel> createUser(String name, String problem, String lat,
    String long, String phoneNumber) async {
  try {
    final String apiUrl =
        "https://smaadhaan-server-interested-eland-ls.eu-gb.mybluemix.net/api/submit-request";
    final data = jsonEncode({
      "name": name,
      "problem": problem,
      "lat": lat,
      "long": long,
      "phone_number": phoneNumber
    });
    Map<String, String> header = {
      'Content-Type': 'application/json ; charset=UTF-8',
      'Charset': 'utf-8'
    };
    final response = await http.post(apiUrl, body: data, headers: header);

    final String responseString = response.body;

    return userModelFromJson(responseString);
  } catch (e) {
    print(e);
  }
}

class _MyHomePageState extends State<MyHomePage> {
  String long = "";
  String lat = "";
  @override
  void initState() {
    super.initState();
    Currentlocation();
  }

  Currentlocation() async {
    final geopostion = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);
    print(geopostion);

    setState(() {
      long = "${geopostion.longitude}";
      lat = "${geopostion.latitude}";
    });
  }

  UserModel _user;

  final TextEditingController nameController = TextEditingController();

  final TextEditingController problemController = TextEditingController();

  final TextEditingController phoneController = TextEditingController();

  String problem;
  List item = ['Water', 'Food', 'Clothing', 'Electricity', 'Your Problem'];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text('Smaadhaan'),
      ),
      body: Container(
        padding: EdgeInsets.all(32),
        child: Column(
          children: [
            TextField(
              controller: nameController,
              decoration: InputDecoration(
                hintText: "Your Name ",
              ),
            ),
            TextField(
              decoration: InputDecoration(
                hintText: "Phone Number",
              ),
              controller: phoneController,
            ),
            DropdownButton(
              hint: Text('Problem'),
              value: problem,
              onChanged: (newValue) {
                setState(() {
                  problem = newValue;
                });
              },
              items: item.map((valueItem) {
                return DropdownMenuItem(
                  value: valueItem,
                  child: Text(valueItem),
                );
              }).toList(),
            ),
            TextField(
              decoration: InputDecoration(
                hintText: "If any other problem then specify here",
              ),
              controller: problemController,
            ),
            SizedBox(
              height: 32,
            ),
            _user == null ? Container() : Text(" "),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final String name = nameController.text;
          final String phoneNumber = phoneController.text;
          final String _problem = problem;

          final UserModel user =
              await createUser(name, _problem, long, lat, phoneNumber);

          setState(() {
            _user = user;
            nameController.clear();
            phoneController.clear();
            problemController.clear();
          });
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context)=>Send())
          );
        },
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}



class Send extends StatelessWidget{
  @override
  
  Widget build(BuildContext context)
  {
    return Scaffold(
      appBar:  AppBar(title: Text('Smaadhaan'),),
      body:Center(
        child: Text('Request Sent......'),
      )
    );
  }
  
}
