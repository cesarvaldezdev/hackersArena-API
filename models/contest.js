/**
 * Contest class, the class describes a contest.
 * @param {[int]} id         [id of a contest]
 * @param {[string]} name    [name of a contest]
 * @param {[date]} start     [date when a contest starts]
 * @param {[date]} end       [date when a contest ends]
 * @param {[string]} type    [type of contest]
 * @param {[arr]} penalty    [pentaltys of a contest]
 * @param {[int]} frozenTime [frozen time of a contest]
 * @param {[int]} deadTime   [dead time of a contest]
 * @param {[arr]} medal      [medalls of the contest]
 */
class Contest {
  constructor(id, name, start, end, type, penalty, frozenTime, deadTime, medal) {
    this.id = id;
    this.name = name;
    this.start = start;
    this.end = end;
    this.type = type;
    this.penalty = penalty;
    this.frozenTime = frozenTime;
    this.deadTime = deadTime;
    this.medal = medal;
  }

  /* save() {
    db.create(this); // agregar los setters & getters
  } */
}

module.exports = new Contest();
