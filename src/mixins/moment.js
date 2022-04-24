import moment from "moment";
export default {
    methods: {
        currentDateTime(date) {
          return moment(date).format("DD-MM-YYYY h:mm");
        },
      },
}