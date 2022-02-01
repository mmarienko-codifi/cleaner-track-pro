<template>
  <table>
    <thead>
      <tr>
        <th>Client name</th>
        <th>Employee revenue</th>
        <th>Equipment revenue</th>
        <th>Total revenue</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>$1457</td>
        <td>$5677</td>
        <td>$6865</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>$1457</td>
        <td>$5677</td>
        <td>$6865</td>
      </tr>
      <tr>
        <td>Francisco Chang</td>
        <td>$1457</td>
        <td>$5677</td>
        <td>$6865</td>
      </tr>
      <tr>
        <td>Maria Anders</td>
        <td>$1457</td>
        <td>$5677</td>
        <td>$6865</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><b>Total</b></td>
        <td>10000$</td>
        <td>10000$</td>
        <td>10000$</td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: var(--color-deactivated);
}
td {
  background-color: var(--color-form);
}
table,
th,
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
