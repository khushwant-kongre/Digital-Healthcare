import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List prescriptions = [];

  @override
  void initState() {
    super.initState();
    fetchPrescriptions();
  }

  fetchPrescriptions() async {
    final response = await http.get(
        Uri.parse("http://10.0.2.2:5000/api/prescription/456"));

    if (response.statusCode == 200) {
      setState(() {
        prescriptions = json.decode(response.body);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("My Prescriptions")),
      body: ListView.builder(
        itemCount: prescriptions.length,
        itemBuilder: (context, index) {
          return Card(
            child: ListTile(
              title: Text(prescriptions[index]["diagnosis"]),
              subtitle: Text("Medicines: " +
                  prescriptions[index]["medicines"].length.toString()),
            ),
          );
        },
      ),
    );
  }
}