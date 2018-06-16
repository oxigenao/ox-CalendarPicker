import { Component, State, EventEmitter, Event, Prop } from "@stencil/core";

@Component({
  tag: "calendar-picker",
  styleUrl: "calendar-picker.css",
  shadow: true
})
export class CalendarPicker {
  date: Date;
  @Prop() multipleDays: boolean = true;
  @State() currentYear;
  @State() currentMonth;
  @State() daysArray: CalendarDay[] = [];
  @Event() selectedDaysUpate: EventEmitter;

  monthLength;
  firstDayOfCurrentMonth;
  lastDayOfCurrentMonth;
  lastMonthLength;
  dayRowWidth = window.innerWidth * 0.14;
  daysWeek = ["L", "M", "X", "J", "V", "S", "D"];
  daysWeekExtended = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];
  months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  selectedDaysDate: Date[] = [];

  componentWillLoad() {
    this.date = new Date();
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.prepareCalendarData();

    let that = this;
    window.addEventListener("resize", function() {
      that.dayRowWidth = window.innerWidth * 0.14;
    });
  }

  prepareCalendarData(): any {
    this.daysArray = [];
    this.firstDayOfCurrentMonth =
      new Date(this.currentYear, this.currentMonth, 1).getDay() - 1;
    this.lastDayOfCurrentMonth =
      new Date(this.currentYear, this.currentMonth + 1, 1).getDay() - 2;

    this.lastMonthLength = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();
    this.monthLength = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    if (this.firstDayOfCurrentMonth == -1) this.firstDayOfCurrentMonth = 6;
    if (this.lastDayOfCurrentMonth == -1) this.lastDayOfCurrentMonth = 6;

    for (let i = 1; i <= this.firstDayOfCurrentMonth; i++) {
      let day = {} as CalendarDay;
      day.day = this.lastMonthLength - (this.firstDayOfCurrentMonth - i);
      day.selected = false;
      day.notCurrent = true;
      day.currentDate = new Date(
        this.currentYear,
        this.currentMonth - 1,
        day.day
      );
      this.daysArray.push(day);
    }

    for (let e = 1; e < this.monthLength + 1; e++) {
      let day = {} as CalendarDay;
      day.day = e;
      day.currentDate = new Date(this.currentYear, this.currentMonth, e);
      day.selected = false;
      day.notCurrent = false;
      this.daysArray.push(day);
    }

    for (let j = 0; j < 6 - this.lastDayOfCurrentMonth; j++) {
      let day = {} as CalendarDay;
      day.day = j + 1;
      day.currentDate = new Date(
        this.currentYear,
        this.currentMonth + 1,
        j + 1
      );
      day.selected = false;
      day.notCurrent = true;
      this.daysArray.push(day);
    }
    this.checkSelected();
  }

  increaseMonth(ev: UIEvent) {
    ev.preventDefault();
    this.currentMonth += 1;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    }
    this.prepareCalendarData();
  }
  decreaseMonth(ev: UIEvent) {
    ev.preventDefault();
    this.currentMonth -= 1;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    }
    this.prepareCalendarData();
  }

  dayClicked(ev: UIEvent, day) {
    let oldDaysArray = this.daysArray;
    this.daysArray = [];

    if (oldDaysArray[day].selected) {
      this.unSelectDay(oldDaysArray[day]);
      oldDaysArray[day].selected = false;
    } else {
      if (
        this.multipleDays ||
        (!this.multipleDays && this.selectedDaysDate.length == 0)
      ) {
        this.selectDay(oldDaysArray[day]);
        oldDaysArray[day].selected = true;
      } else {
        this.selectedDaysDate = [];
        oldDaysArray.forEach(day => {
          day.selected = false;
        });
        this.selectDay(oldDaysArray[day]);
        oldDaysArray[day].selected = true;
      }
    }
    Object.assign(this.daysArray, oldDaysArray);
    ev.stopPropagation();
  }

  selectDay(day) {
    let sDay = new Date();
    sDay = day.currentDate as Date;
    this.selectedDaysDate.push(sDay);
    this.selectedDaysDate = this.selectedDaysDate.sort((a: Date, b: Date) => {
      if (a.getTime() > b.getTime()) {
        return 1;
      } else {
        return -1;
      }
    });
    this.selectedDaysUpate.emit(this.selectedDaysDate);
  }

  unSelectDay(day) {
    let day2Remove = this.isDateOnSelectedDays(day);
    if (
      day2Remove != undefined &&
      day2Remove == 0 &&
      this.selectedDaysDate.length == 1
    ) {
      this.selectedDaysDate.splice(-1, 1);
    } else if (day2Remove != undefined) {
      this.selectedDaysDate.splice(day2Remove, 1);
    }
    this.selectedDaysUpate.emit(this.selectedDaysDate);
  }

  isDateOnSelectedDays(day) {
    let findIndex;
    this.selectedDaysDate.forEach((date, index) => {
      if (
        date.getDate() == day.currentDate.getDate() &&
        date.getMonth() == day.currentDate.getMonth() &&
        date.getFullYear() == day.currentDate.getFullYear()
      ) {
        findIndex = index;
      }
    });
    return findIndex;
  }

  componentWillUpdate() {}

  checkSelected() {
    this.selectedDaysDate.forEach((selectedDay: Date) => {
      this.daysArray.forEach(day => {
        if (
          day.currentDate.getDate() == selectedDay.getDate() &&
          day.currentDate.getMonth() == selectedDay.getMonth() &&
          day.currentDate.getFullYear() == selectedDay.getFullYear()
        ) {
          day;
          day.selected = true;
        }
      });
    });
  }

  emitSelectedDaysChange() {
    this.selectedDaysUpate.emit(this.selectedDaysDate);
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="width-3">
            <button
              class="monthChangeButton"
              onClick={ev => this.decreaseMonth(ev)}
            >
              Anterior
            </button>
          </div>
          <div class="width-6">
            <p class="calendar-title">
              {this.months[this.currentMonth]} {this.currentYear}
            </p>
          </div>
          <div class="width-3">
            <button
              class="monthChangeButton"
              onClick={ev => this.increaseMonth(ev)}
            >
              Siguiente
            </button>
          </div>
        </div>
        <div class="row">
          {this.daysArray.map((day, index) => {
            return (
              <div class="width-14 calendar-day">
                <button
                  onClick={ev => this.dayClicked(ev, index)}
                  class={day.selected ? "selected" : ""}
                >
                  {day.day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export interface CalendarDay {
  day: number;
  selected: boolean;
  currentDate: Date;
  notCurrent: boolean;
}
