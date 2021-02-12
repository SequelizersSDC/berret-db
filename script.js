import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';
export let errorRate = new Rate('errors');

const item_id = Math.floor(Math.random() * (10000000 - 1 + 1)) + 1

export default function () {
  var url = `http://localhost:6969/api/items/${item_id}/info`;
  check(http.get(url), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
}

sleep(1)