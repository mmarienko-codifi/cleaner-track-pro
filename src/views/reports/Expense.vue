<template>
  <table>
    <thead>
      <tr>
        <th>Employee name</th>
        <th>Employee salary</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>$4000</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>$5000</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>$5000</td>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>$4000</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>$5000</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td><b>Total</b></td>
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
