import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate } from "k6/metrics";
import { check, fail } from "k6";

export let GetDuration = new Trend('get_customer_duration');       //Tempo da requisição (ms)
export let GetReqs = new Rate('get_customer_reqs');                // percentual de requisição
export let GetSuccessRate = new Rate('get_customer_success_rate'); // percentual de sucesso de requisição
export let GetFailRate = new Rate('get_customer_fail_rate');       // percentual de falha de requisição

export default function () {
    let res = http.get('URL')

    // GetDuration.add(res.timings.duration);
    // GetReqs.add(1);
    // GetSuccessRate.add(res.status == 200);
    // GetFailRate.add(res.status == 0 || res.status != 200);

    let msgFail = 'Falha ao verificar status code.';

    if (!check(res, {
        'Status code 200': (r) => r.status === 200,
        'Duração': (r) => r.timings.duration < 1000,
    })) {
        fail(msgFail);
    }

    sleep(1);
}


