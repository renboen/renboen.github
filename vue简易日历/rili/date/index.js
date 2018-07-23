(function() {
    function DatePicker() {
        this.now = new Date();
        this.now_year = this.now.getFullYear();
        this.now_month = this.now.getMonth() + 1;
        this.now_date = this.now.getDate();
        this.day31 = [1, 3, 5, 7, 8, 10, 12];
        this.day30 = [4, 6, 9, 11];
    };
    DatePicker.prototype.getYear = function() {
        return this.now_year
    };
    DatePicker.prototype.getMonth = function() {
        return this.now_month
    };
    DatePicker.prototype.getDate = function() {
        return this.now_date
    };

    DatePicker.prototype.isRunNian = function() {
        //判断是否是闰年
        return this.now_year % 4 === 0
    };
    DatePicker.prototype.firstDayIsWeekNum = function() {
        //判断每月一号是星期几
        return new Date(this.now_year + "-" + this.now_month + "-" + 1).getDay()
    };
    DatePicker.prototype.totalDaysOneMonth = function() {
        //判断每月有几天
        if (this.day31.indexOf(this.now_month) > -1)
            return 31;
        this.day30.indexOf(this.now_month) > -1
        return 30;
        this.now_month === 2 && this.isRunNian()
        return 29;
        this.now_month === 2 && !this.isRunNian()
        return 28;
    };
    let date_detail = document.querySelector(".date_detail");
    let date_td = document.querySelectorAll("td");

    DatePicker.prototype.header_show = function() {
        date_detail.innerHTML = this.now_year + "-" + this.now_month
    };
    DatePicker.prototype.prve_click = function() {
        //月份减少
        this.now_month--;
        if (this.now_month === 0) {
            this.now_month = 12;
            this.now_year--;
        };
        this.header_show();
        this.body_show();
        let active_ele = document.querySelector(".active_date");
        if (active_ele) active_ele.className = "";
        this.current_date_active()

    }
    DatePicker.prototype.next_click = function() {
        //月份增加
        this.now_month++;
        if (this.now_month === 13) {
            this.now_month = 1;
            this.now_year++;
        }
        this.header_show();
        this.body_show();
        //为了保证每次切换时，只在当前日期显示激活状态
        let active_ele = document.querySelector(".active_date");
        if (active_ele) active_ele.className = "";
        this.current_date_active()
    };
    DatePicker.prototype.body_show = function() {
        console.log(this)
        let _index = this.firstDayIsWeekNum();
        let totalDays = this.totalDaysOneMonth();
        alert(totalDays)
        for (var j = 0; j < _index; j++) {
            date_td[j].innerHTML = "";
            date_td[j].removeAttribute("date")
        }
        //插入数据
        for (var i = 1; i <= totalDays; i++) {
            date_td[_index].innerHTML = i;
            let date = this.now_year + "-" + this.now_month + "-" + i;
            date_td[_index].setAttribute("date", date)
                //解决当前日期激活状态，在点击下一月后会在相位置任然处于激活状态问题
            date_td[_index].className = "";
            _index++
        }
        // console.log(firstday_isweek_num)
        //去除每月最后一天之后的数据
        for (var j = _index; j < 42; j++) {
            date_td[j].innerHTML = "1";
            // date_td[j].style.border = "none"
            date_td[j].removeAttribute("date")

        }

    };
    let date_tbody = document.querySelector("tbody");

    DatePicker.prototype.date_tbody_click = function(e) {
            //代理日期点击事件
            //e为每个日期的元素被点击的时候的事件对象
            console.log(e.target)
            let active_ele = document.querySelector(".active_date");
            let flg = e.target.getAttribute("date");
            console.log(flg)
                //防止点击无效时间
            if (flg) {
                if (active_ele) {
                    active_ele.className = ""
                };
                e.target.className = "active_date"
                return flg
            } else {
                return false
            }
        }
        //初始化当前日期为激活状态
    DatePicker.prototype.current_date_active = function(e) {
        let current = new Date()
        let str = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" + current.getDate();
        let active_ele = document.querySelector('[date="' + str + '"]');
        if (active_ele) active_ele.className = "active_date";
    };

    DatePicker.prototype.init = function() {
        this.header_show();
        this.body_show();
        this.current_date_active()
        date_tbody.addEventListener("click", this.date_tbody_click, false)
    }
    window.DatePicker = DatePicker

})(window)