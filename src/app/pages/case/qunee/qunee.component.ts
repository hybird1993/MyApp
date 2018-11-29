import { Component, OnInit } from '@angular/core';
import { mock_data } from './mock.data';

declare const Q;
@Component({
  selector: 'app-qunee',
  templateUrl: './qunee.component.html',
  styleUrls: ['./qunee.component.scss']
})
export class QuneeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const graph = new Q.Graph('canvas');
    graph.isMovable = false;
    this.translateToQuneeElements(mock_data, graph);
    graph.interactionMode = null;

  }

  translateToQuneeElements(json, graph) {
    const map = {};
    if (json.nodes) {
      Q.forEach(json.nodes, function(data) {
        const node = graph.createNode(data.name, data.x || 0, data.y || 0);
        node.set('data', data);
        map[data.id] = node;
      });
    }
    if (json.edges) {
      Q.forEach(json.edges, function(data) {
        const from = map[data.from];
        const to = map[data.to];
        if (!from || !to) {
          return;
        }
        const edge = graph.createEdge(data.name, from, to);
        edge.set('data', data);
      }, graph);
    }
  }

}
