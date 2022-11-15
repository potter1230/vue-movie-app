import { mount, shallowMount } from "@vue/test-utils";
// 플러그인
import router from "~/routes"; // ~/routes/index.js
import store from "~/store";
// 컴포넌트
import Header from "~/components/Header";

describe("components/Header.vue", () => {
    test("경로 정규표현식이 없는 경우 일치하지 않습니다.", () => {
        const wrapper = shallowMount(Header, {
            global: {
                plugins: [
                    router,
                    store
                ]
            }
        });
        const regExp = undefined;
        expect(wrapper.vm.isMatch(regExp)).toBe(123);
    });
});