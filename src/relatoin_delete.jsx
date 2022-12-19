import { Component } from "react";

export default class AllNodeNew2 extends Component {
  constructor() {
    super();
    this.state = {
      node: [],
      node_from_del: "",
      noderel_to_del: "",
      relation: []
    };
    this.fetchdata = this.fetchdata.bind(this);
    this.delete = this.delete.bind(this);
    this.retreive = this.retreive.bind(this);
  }

  // init_connection() {
  //   this.setState({ ros: new window.ROSLIB.Ros() });
  //   this.state.ros = new window.ROSLIB.Ros();
  //   // console.log("Map:" + this.state.ros);
  //   try {
  //     this.state.ros.connect(
  //       "ws://" +
  //         Config.ROSBRIDGE_SERVER_IP +
  //         ":" +
  //         Config.ROSBRIDGE_SERVER_PORT +
  //         ""
  //     );
  //   } catch (error) {
  //     console.log(
  //       "ws://" +
  //         Config.ROSBRIDGE_SERVER_IP +
  //         ":" +
  //         Config.ROSBRIDGE_SERVER_PORT +
  //         ""
  //     );
  //     console.log("cannot connect to the WS robot. Try again after 1 second ");
  //   }
  // }

  componentDidMount() {
    this.init_connection();
    this.retreive();
  }

  static mapname;

  fetchdata() {
    fetch("http://192.168.0.165:8000/nodes")
      .then((response) => response.json())
      .then((data) => {
        var mapname = AllNodeNew2.mapname;
        var temp_data_miss = data.filter(function (el) {
          return el.map_name === mapname;
        });

        for (var i = 1; i <= 20; i++) {
          var relation = temp_data_miss.map(function (item) {
            return item["relation_" + i];
          });
          console.log(relation);
        }

        if (relation.item === temp_data_miss.item) {
          alert("ok");
          console.log(relation.item === temp_data_miss.item);
        }

        this.setState({
          node: temp_data_miss
        });
      });
  }

  delete() {
    var node_from_del = "";
    var noderel_to_del = "";

    var nodes_temp = this.state.node.filter((e) => {
      return e.node_name == this.state.node_from_del;
    });

    var temp_data = this.state.node.filter((e) => {
      return e.node_name == this.state.noderel_to_del;
    });

    alert("Relation Deleted");

    nodes_temp.push(temp_data[0]);

    for (var k = 0; k < 2; k++) {
      if (k == 0) {
        node_from_del = this.state.node_from_del;
        noderel_to_del = this.state.noderel_to_del;
      } else {
        node_from_del = this.state.noderel_to_del;
        noderel_to_del = this.state.node_from_del;
      }

      var from_node_temp_rel_number = 0;
      for (var i = 0; i < 20; i++) {
        if (nodes_temp[k]["relation_" + (i + 1)] == noderel_to_del) {
          from_node_temp_rel_number = i + 1;
        }
      }

      var data_to_put = {
        map_name: nodes_temp[k].map_name,
        node_name: nodes_temp[k].node_name,
        relation_1: "",
        relation_2: "",
        relation_3: "",
        relation_4: "",
        relation_5: "",
        relation_6: "",
        relation_7: "",
        relation_8: "",
        relation_9: "",
        relation_10: "",
        relation_11: "",
        relation_12: "",
        relation_13: "",
        relation_14: "",
        relation_15: "",
        relation_16: "",
        relation_17: "",
        relation_18: "",
        relation_19: "",
        relation_20: ""
      };

      for (var i = 0; i < 20; i++) {
        if (+i + 1 >= from_node_temp_rel_number && i < 19) {
          data_to_put["relation_" + (+i + 1)] =
            nodes_temp[k]["relation_" + (i + 2)];
        } else if (+i + 1 < from_node_temp_rel_number) {
          data_to_put["relation_" + (+i + 1)] =
            nodes_temp[k]["relation_" + (i + 1)];
        } else if (i > 19) {
          data_to_put["relation_" + (+i + 1)] = "";
        }
      }

      fetch("http://192.168.0.165:8000/nodes" + nodes_temp[k].id + "/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data_to_put)
      }).then(() => {
        this.fetchdata();

        document.getElementById("DD_1").selectedIndex = 0;
        document.getElementById("DD_2").selectedIndex = 0;
      });
    }
  }

  // retreive() {
  //   var that = this;
  //   var pose_subscriber = new window.ROSLIB.Topic({
  //     ros: this.state.ros,
  //     name: Config.STATUS
  //     // messageType: "std_msgs/String",
  //   });
  //   pose_subscriber.subscribe(function (message) {
  //     AllNodeNew2.mapname = message.Current_Map_Name;

  //     pose_subscriber.unsubscribe();
  //     that.fetchdata();
  //   });
  // }

  render() {
    return (
      <section id="createposition">
        <div className="toppadding">
          <h3>Delete Relation</h3>
          <table>
            <tr>
              <td>
                <select
                  className="form-select"
                  aria-label="Floating label select example"
                  id="DD_1"
                  onChange={(e) => {
                    var position = this.state.node.filter(function (el) {
                      return el.node_name === e.target.value;
                    });
                    var relations_1 = [];
                    for (var i = 0; i < 20; i++) {
                      if (position[0]["relation_" + (i + 1)] !== "") {
                        relations_1.push(position[0]["relation_" + (i + 1)]);
                      }
                    }
                    this.setState({
                      relation: relations_1,
                      node_from_del: e.target.value
                    });
                  }}
                >
                  <option value="DD-1" selected disabled={true}>
                    Node
                  </option>
                  {this.state.node.map((emp) => {
                    return (
                      <option key={emp.key} value={emp.value}>
                        {emp.node_name}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <select
                  className="form-select"
                  aria-label="Floating label select example"
                  id="DD_2"
                  onChange={(e) => {
                    this.setState({
                      noderel_to_del: e.target.value
                    });
                  }}
                >
                  <option value="DD-1" selected disabled={true}>
                    Relation
                  </option>
                  {this.state.relation.map((emp) => {
                    return (
                      <option key={emp.key} value={emp.value}>
                        {emp}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <button onClick={this.delete}>Delete</button>
              </td>
            </tr>
          </table>
        </div>
      </section>
    );
  }
}
